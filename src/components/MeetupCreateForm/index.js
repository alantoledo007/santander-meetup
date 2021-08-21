import { Paper, Button, Container, Box, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "src/components/MeetupEditForm/schema";
import moment from "moment";

export default function MeetupEditForm({ handleCreate }) {
  const {
    register,
    handleSubmit,
    errors,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    return handleCreate(data).then(() => {
      reset();
    });
  };
  return (
    <Container maxWidth="sm">
      <Paper>
        <Container component={Box} py={5}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box my={3}>
              <TextField
                type="datetime-local"
                name="datetime"
                id="datetime"
                variant="outlined"
                fullWidth
                placeholder="DD/MM/AAAA HH:mm"
                label="Fecha y Hora"
                error={!!errors.datetime?.message}
                helperText={errors.datetime?.message}
                inputProps={{
                  min: moment(Date.now())
                    .startOf("day")
                    .add(1, "days")
                    .format("YYYY-MM-DD[T]HH:mm"),
                }}
                inputRef={register}
              />
            </Box>

            <Box mb={3}>
              <TextField
                type="check_in_code"
                name="check_in_code"
                id="check_in_code"
                variant="outlined"
                fullWidth
                placeholder="AB1234"
                label="Codigo de Check-In"
                error={!!errors.check_in_code?.message}
                helperText={
                  errors.check_in_code?.message ||
                  "Este codigo permite a los usuarios hacer Check-In, procura compartirlo en la meetup."
                }
                inputRef={register}
              />
            </Box>

            <Button
              aria-label="Enviar"
              size="large"
              type="submit"
              color="primary"
              disabled={isSubmitting}
              fullWidth
              variant="contained"
            >
              Crear meetup
            </Button>
          </form>
        </Container>
      </Paper>
    </Container>
  );
}
