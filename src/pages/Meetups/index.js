import { useEffect, useState } from "react";
import AppLayout from "src/layouts/AppLayout";
import { getMeetups } from "src/firebase/meetups";
import { MEETUPS_LOADING } from "src/core/constants";
import MeetupList from "src/components/MeetupList";
import Spinner from "src/components/shared/Spinner";
import Title from "src/components/shared/Title";
import { Box } from "@material-ui/core";
import ErrorAlert from "src/components/shared/ErrorAlert";
import useError from "src/hooks/useError";

export default function Meetups() {
  const [meetups, setMeetups] = useState(MEETUPS_LOADING); //null = loading, array = there's data/no data
  const { error, catchError, onErrorClose } = useError();

  useEffect(() => {
    const unsubscriber = getMeetups(setMeetups, (error) => {
      catchError(error);
      setMeetups([]);
    });
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
      <ErrorAlert
        open={error !== false}
        message={error}
        onClose={onErrorClose}
      />
    </AppLayout>
  );
}
