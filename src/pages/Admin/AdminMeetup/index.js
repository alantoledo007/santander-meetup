import { useEffect, useState } from "react";
import AppLayout from "src/layouts/AppLayout";
import { getMeetup } from "src/firebase/meetups";
import { DOC_STATES } from "src/core/constants";
import MeetupAdminDetails from "src/components/MeetupAdminDetails";
import Spinner from "src/components/shared/Spinner";
import { useParams } from "react-router-dom";
import RecordNotFound from "src/components/shared/RecordNotFound";
import useError from "src/hooks/useError";
import ErrorAlert from "src/components/shared/ErrorAlert";
import Title from "src/components/shared/Title";
import { Box } from "@material-ui/core";

export default function AdminMeetup() {
  const [meetup, setMeetup] = useState(DOC_STATES.LOADING);
  const { id } = useParams();
  const { error, catchError, onErrorClose } = useError();

  useEffect(() => {
    const unsubscriber = getMeetup(id, setMeetup, (error) => {
      catchError(error);
      setMeetup(null);
    });
    return () => {
      unsubscriber();
    };
  }, [id]);

  return (
    <AppLayout>
      {meetup === DOC_STATES.LOADING ? (
        <Spinner />
      ) : meetup === DOC_STATES.NOT_EXISTS ? (
        <RecordNotFound message={"Lo sentimos, no encontramos esa Meetup"} />
      ) : (
        <>
          <Box mb={3}>
            <Title>Detalles de la meetup</Title>
          </Box>
          <MeetupAdminDetails meetup={meetup} />
        </>
      )}
      <ErrorAlert
        open={error !== false}
        message={error}
        onClose={onErrorClose}
      />
    </AppLayout>
  );
}
