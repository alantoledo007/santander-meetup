import { Grid } from "@material-ui/core";
import MeetupCard from "src/components/MeetupCard";
import NoRecords from "src/components/shared/NoRecords";

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
        <NoRecords message="Lo sentimos, no hay meetups disponibles." />
      )}
    </>
  );
}
