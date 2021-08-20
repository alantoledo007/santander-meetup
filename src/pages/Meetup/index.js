import { useEffect, useState } from "react";
import AppLayout from "src/layouts/AppLayout";
import {
  getMeetup,
  meetupRegister,
  meetupUnregister,
} from "src/firebase/meetups";
import { DOC_STATES } from "src/core/constants";
import MeetupDetails from "src/components/MeetupDetails";
import Spinner from "src/components/shared/Spinner";
import { useParams } from "react-router-dom";
import RecordNotFound from "src/components/shared/RecordNotFound";
import SuccessAnimation from "src/components/shared/SuccessAnimation";
import useError from "src/hooks/useError";

export default function Meetup() {
  const [meetup, setMeetup] = useState(DOC_STATES.LOADING);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { error, catchError, onErrorClose } = useError();

  useEffect(() => {
    const unsubscriber = getMeetup(id, setMeetup, (error) => {
      setMeetup(null);
    });
    return () => {
      unsubscriber();
    };
  }, [id]);

  const register = (id) => {
    setLoading(true);
    meetupRegister(id)
      .then(() => {
        setShowSuccess(true);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const unregister = (id) => {
    setLoading(true);
    meetupUnregister(id)
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRegistration = (meetup) => {
    if (!meetup.registered) {
      return register;
    }
    return unregister;
  };

  return (
    <AppLayout>
      {showSuccess ? (
        <SuccessAnimation
          message="¡Te esperamos!"
          onClick={() => setShowSuccess(false)}
        />
      ) : meetup === DOC_STATES.LOADING || loading ? (
        <Spinner />
      ) : meetup === DOC_STATES.NOT_EXISTS ? (
        <RecordNotFound message={"Lo sentimos, no encontramos esa Meetup"} />
      ) : (
        <MeetupDetails
          meetup={meetup}
          onRegistering={handleRegistration(meetup)}
        />
      )}
    </AppLayout>
  );
}
