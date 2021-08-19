import { Route, Switch } from "react-router-dom";
import Login from "src/pages/Login";
import Meetups from "src/pages/Meetups";
import { ROUTER_PATHS } from "src/core/constants";
import Error404 from "src/pages/Error404";
import useUser from "src/hooks/useUser";

export default function Routes() {
  const user = useUser();

  return (
    <>
      {user.isUnknow() ? (
        <p>cargando...</p>
      ) : (
        <>
          <Switch>
            <Route exact path={"/"}>
              <Login auth={user.isAuthenticated()} />
            </Route>
            {user.isAuthenticated() && (
              <>
                <Route path={ROUTER_PATHS.meetups}>
                  <Meetups />
                </Route>
              </>
            )}
            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}
