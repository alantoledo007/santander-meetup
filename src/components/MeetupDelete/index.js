import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

export default function MeetupDelete({ meetup, handleDelete }) {
  const inscriptions = Array.isArray(meetup.inscriptions)
    ? meetup.inscriptions.length
    : 0;

  return (
    <>
      <Card>
        <CardContent>
          <List>
            <ListItem>
              <ListItemText
                primary="Fecha y Hora"
                secondary={meetup.datetime + " hs"}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Inscriptos" secondary={inscriptions} />
            </ListItem>
          </List>

          <Typography variant="body1">
            ¿Seguro que desea borrar esta meetup?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDelete(meetup.id)}
          >
            Si, borrar
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
