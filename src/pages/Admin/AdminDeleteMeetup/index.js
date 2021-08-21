import { useEffect, useState } from "react";
import AppLayout from "src/layouts/AppLayout";
import { getMeetup, meetupDelete } from "src/firebase/meetups";
import { DOC_STATES } from "src/core/constants";
import MeetupDelete from "src/components/MeetupDelete";
import Spinner from "src/components/shared/Spinner";
import { useParams } from "react-router-dom";
import RecordNotFound from "src/components/shared/RecordNotFound";
import useError from "src/hooks/useError";
import ErrorAlert from "src/components/shared/ErrorAlert";
import Title from "src/components/shared/Title";
import { Box } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";

export default function AdminDeleteMeetup() {
  const [meetup, setMeetup] = useState(DOC_STATES.LOADING);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { error, catchError, onErrorClose } = useError();
  const { addToast } = useToasts();

  useEffect(() => {
    const unsubscriber = getMeetup(id, setMeetup, (error) => {
      catchError(error);
      setMeetup(null);
    });
    return () => {
      unsubscriber();
    };
  }, [id]);

  const handleDelete = (id) => {
    setLoading(true);
    return meetupDelete(id)
      .then(() => {
        addToast("Se borro la meetup correctamente.", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <AppLayout>
      {meetup === DOC_STATES.LOADING || loading ? (
        <Spinner />
      ) : meetup === DOC_STATES.NOT_EXISTS ? (
        <RecordNotFound message={"Lo sentimos, no encontramos esa Meetup"} />
      ) : (
        <>
          <Box mb={3}>
            <Title>Detalles de la meetup</Title>
          </Box>
          <MeetupDelete meetup={meetup} handleDelete={handleDelete} />
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
