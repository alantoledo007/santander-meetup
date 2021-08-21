import { useEffect, useState } from "react";
import AppLayout from "src/layouts/AppLayout";
import { getMeetups } from "src/firebase/meetups";
import { MEETUPS_LOADING, ROUTER_PATHS } from "src/core/constants";
import MeetupAdminList from "src/components/MeetupAdminList";
import Spinner from "src/components/shared/Spinner";
import Title from "src/components/shared/Title";
import { Box, Button } from "@material-ui/core";
import ErrorAlert from "src/components/shared/ErrorAlert";
import useError from "src/hooks/useError";
import { Link as RouterLink } from "react-router-dom";

export default function Meetups() {
  const [meetups, setMeetups] = useState(MEETUPS_LOADING); //null = loading, array = there's data/no data
  const [selected, setSelected] = useState();
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
        <Title>Administrar meetups</Title>
      </Box>

      {meetups === MEETUPS_LOADING ? (
        <Spinner />
      ) : (
        <>
          <Box mb={2}>
            <Button
              component={RouterLink}
              to={ROUTER_PATHS.admin_meetups_create}
              variant="contained"
              color="primary"
            >
              Nueva
            </Button>
            <Button
              component={RouterLink}
              to={ROUTER_PATHS.admin_meetups_details.replace(":id", selected)}
              disabled={!selected}
              color="primary"
            >
              Detalles
            </Button>
            <Button
              component={RouterLink}
              to={ROUTER_PATHS.admin_meetups_edit.replace(":id", selected)}
              disabled={!selected}
            >
              Modificar
            </Button>
            <Button
              component={RouterLink}
              to={ROUTER_PATHS.admin_meetups_delete.replace(":id", selected)}
              disabled={!selected}
            >
              Borrar
            </Button>
          </Box>
          <MeetupAdminList
            selected={selected}
            setSelected={setSelected}
            meetups={meetups}
          />
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
