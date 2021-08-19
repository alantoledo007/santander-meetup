import { Redirect, Route, Switch } from "react-router-dom";
import Login from "src/pages/Login";
import Meetups from "src/pages/Meetups";
import { ROUTER_PATHS } from "src/core/constants";
import Error404 from "src/pages/Error404";
import useUser from "src/hooks/useUser";

export default function Routes() {
  const user = useUser();
  const loggedIn = user.isAuthenticated();
  return (
    <>
      {user.isUnknow() ? (
        <p>cargando...</p>
      ) : (
        <>
          <Switch>
            <Route exact path={"/"}>
              {loggedIn ? <Redirect to={ROUTER_PATHS.meetups} /> : <Login />}
            </Route>
            <Route exact path={ROUTER_PATHS.meetups}>
              {!loggedIn ? <Redirect to="/" /> : <Meetups />}
            </Route>
            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}
