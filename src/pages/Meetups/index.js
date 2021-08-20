import { useEffect, useState } from "react";
import AppLayout from "src/layouts/AppLayout";
import { getMeetups } from "src/firebase/meetups";
import { MEETUPS_LOADING } from "src/core/constants";
import MeetupList from "src/components/MeetupList";
import Spinner from "src/components/shared/Spinner";
import Title from "src/components/shared/Title";
import { Box } from "@material-ui/core";

export default function Meetups() {
  const [meetups, setMeetups] = useState(MEETUPS_LOADING); //null = loading, array = data/no-data

  useEffect(() => {
    const unsubscriber = getMeetups(setMeetups);
    return () => {
      unsubscriber();
    };
  }, []);

  return (
    <AppLayout>
      <Box mb={3}>
        <Title>Meetups</Title>
      </Box>
      {meetups === MEETUPS_LOADING ? (
        <Spinner />
      ) : (
        <MeetupList meetups={meetups} />
      )}
    </AppLayout>
  );
}
