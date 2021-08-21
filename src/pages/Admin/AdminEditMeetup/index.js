import { useEffect, useState } from "react";
import AppLayout from "src/layouts/AppLayout";
import { getMeetup, meetupEdit } from "src/firebase/meetups";
import { DOC_STATES } from "src/core/constants";
import MeetupEditForm from "src/components/MeetupEditForm";
import Spinner from "src/components/shared/Spinner";
import { useParams } from "react-router-dom";
import RecordNotFound from "src/components/shared/RecordNotFound";
import SuccessAnimation from "src/components/shared/SuccessAnimation";
import useError from "src/hooks/useError";
import ErrorAlert from "src/components/shared/ErrorAlert";
import Title from "src/components/shared/Title";
import { Box } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";

export default function AdminEditMeetup() {
  const [meetup, setMeetup] = useState(DOC_STATES.LOADING);
  const { id } = useParams();
  const [showSuccess, setShowSuccess] = useState(false);
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

  const editHandler = (id, data) => {
    return meetupEdit(id, data).then(() => {
      addToast("Modificaste la meetup correctamente", {
        appearance: "success",
        autoDismiss: true,
      });
    });
  };

  return (
    <AppLayout>
      {showSuccess ? (
        <SuccessAnimation
          message="¡Te esperamos!"
          onClick={() => setShowSuccess(false)}
        />
      ) : meetup === DOC_STATES.LOADING ? (
        <Spinner />
      ) : meetup === DOC_STATES.NOT_EXISTS ? (
        <RecordNotFound message={"Lo sentimos, no encontramos esa Meetup"} />
      ) : (
        <>
          <Box mb={3}>
            <Title align="center">Modificar meetup</Title>
          </Box>
          <MeetupEditForm meetup={meetup} edit={editHandler} />
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
