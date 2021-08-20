import { Grid } from "@material-ui/core";
import MeetupCard from "../MeetupCard";

export default function MeetupList({ meetups }) {
  return (
    <>
      {meetups.length > 0 ? (
        <Grid container spacing={2}>
          {meetups.map((item) => (
            <MeetupCard key={item.id} meetup={item} />
          ))}
        </Grid>
      ) : (
        <div>No hay meetups</div>
      )}
    </>
  );
}
