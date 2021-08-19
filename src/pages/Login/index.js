import LoginForm from "src/components/LoginForm";
import AppLayout from "src/layouts/AppLayout";
import { loginWithEmailAndPassword } from "src/firebase/auth";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { ROUTER_PATHS } from "src/core/constants";

export default function Login({ auth }) {
  const history = useHistory();

  useEffect(() => {
    if (auth) {
      history.replace(ROUTER_PATHS.meetups);
    }
  }, [auth]);

  return (
    <>
      {!auth && (
        <AppLayout>
          <LoginForm login={loginWithEmailAndPassword} />
        </AppLayout>
      )}
    </>
  );
}
