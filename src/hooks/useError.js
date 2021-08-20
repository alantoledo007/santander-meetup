import { useState } from "react";
import { getErrorMessage } from "src/core/utils";

export default function useError() {
  const [error, setError] = useState(false);
  const onErrorClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  const catchError = (error) => {
    setError(getErrorMessage(error?.code));
  };

  return {
    error,
    catchError,
    onErrorClose,
  };
}
