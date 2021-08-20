import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { getDateFromDatetime, getTimeFromDatetime } from "src/core/utils";
import { ROUTER_PATHS } from "src/core/constants";

export default function MeetupCard({ meetup }) {
  return (
    <Grid item xs={6} sm={3} md={2}>
      <Card>
        <CardContent mt="3">
          <Typography variant="h4">
            {getDateFromDatetime(meetup.datetime)}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {getTimeFromDatetime(meetup.datetime)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            to={`${ROUTER_PATHS.meetups}/${meetup.id}`}
            component={Link}
            size="large"
            fullWidth
            color={meetup.registered ? "default" : "primary"}
          >
            {meetup.registered ? "Cancelar" : "Inscribirse"}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
