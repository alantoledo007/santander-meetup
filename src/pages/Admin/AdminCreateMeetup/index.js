import AppLayout from "src/layouts/AppLayout";
import { meetupCreate } from "src/firebase/meetups";

import MeetupCreateForm from "src/components/MeetupCreateForm";

import Title from "src/components/shared/Title";
import { Box } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import { getErrorMessage } from "src/core/utils";

export default function AdminCreateMeetup() {
  const { addToast } = useToasts();

  const handleCreate = (data) => {
    return meetupCreate(data)
      .then(() => {
        addToast("Creaste la meetup correctamente", {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch((error) => {
        addToast(getErrorMessage(error?.code), {
          appearance: "error",
          autoDismississ: true,
        });
      });
  };

  return (
    <AppLayout>
      <Box mb={3}>
        <Title align="center">Crear meetup</Title>
      </Box>
      <MeetupCreateForm handleCreate={handleCreate} />
    </AppLayout>
  );
}
