import LoginForm from "src/components/LoginForm";
import AppLayout from "src/layouts/AppLayout";
import { loginWithEmailAndPassword } from "src/firebase/auth";

export default function Login() {
  return (
    <AppLayout>
      <LoginForm login={loginWithEmailAndPassword} />
    </AppLayout>
  );
}
