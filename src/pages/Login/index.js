import LoginForm from "src/components/LoginForm";
import AppLayout from "src/layouts/AppLayout";
import { loginWithEmailAndPassword } from "src/firebase/auth";
import { useToasts } from "react-toast-notifications";
import { getErrorMessage } from "src/core/utils";

export default function Login() {
  const { addToast } = useToasts();

  const handleLogin = (email, password) => {
    return loginWithEmailAndPassword(email, password).catch((error) => {
      addToast(getErrorMessage(error?.code), {
        appearance: "error",
        autoDismiss: true,
      });
    });
  };

  return (
    <AppLayout>
      <LoginForm login={handleLogin} />
    </AppLayout>
  );
}
