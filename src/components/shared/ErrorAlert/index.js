import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export default function ErrorAlert({ open, message, onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert severity="error" elevation={6} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}
