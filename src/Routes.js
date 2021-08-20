import { Redirect, Route, Switch } from "react-router-dom";
import Login from "src/pages/Login";
import Meetups from "src/pages/Meetups";
import Meetup from "src/pages/Meetup";
import { ROUTER_PATHS } from "src/core/constants";
import Error404 from "src/pages/Error404";
import useUser from "src/hooks/useUser";
import Loader from "./components/shared/Loader";

export default function Routes() {
  const user = useUser();
  const loggedIn = user.isAuthenticated();
  const authHandler = (render) => {
    return !loggedIn ? <Redirect to="/" /> : render;
  };
  return (
    <>
      {user.isUnknow() ? (
        <Loader />
      ) : (
        <>
          <Switch>
            <Route exact path={"/"}>
              {loggedIn ? <Redirect to={ROUTER_PATHS.meetups} /> : <Login />}
            </Route>
            <Route exact path={ROUTER_PATHS.meetups}>
              {authHandler(<Meetups />)}
            </Route>
            <Route path={`${ROUTER_PATHS.meetups}/:id`}>
              {authHandler(<Meetup />)}
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
