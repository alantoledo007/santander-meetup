import { Paper, Button, Container, Box, TextField } from "@material-ui/core";
import Title from "src/components/shared/Title";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import { useHistory } from "react-router-dom";

export default function LoginForm({ login }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const history = useHistory();

  const onSubmit = async (data) => {
    await login(data.email, data.password);
    reset();
  };
  return (
    <Container maxWidth="sm">
      <Paper>
        <Container component={Box} py={5}>
          <Title aria-label="Título">Iniciar sesión</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box my={3}>
              <TextField
                type="text"
                name="email"
                id="email"
                variant="outlined"
                fullWidth
                placeholder="Email"
                label="Correo electrónico"
                error={!!errors.email?.message}
                helperText={errors.email?.message}
                {...register("email")}
              />
            </Box>

            <Box mb={3}>
              <TextField
                type="password"
                name="password"
                id="password"
                variant="outlined"
                fullWidth
                placeholder="Contraseña"
                label="Contraseña"
                error={!!errors.password?.message}
                helperText={errors.password?.message}
                {...register("password")}
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
              Iniciar sesión
            </Button>
          </form>
        </Container>
      </Paper>
    </Container>
  );
}
