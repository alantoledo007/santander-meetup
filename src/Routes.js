import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "src/pages/Login";
import Meetups from "src/pages/Meetups";
import Meetup from "src/pages/Meetup";
import { ROUTER_PATHS } from "src/core/constants";
import Error404 from "src/pages/Error404";
import useUser from "src/hooks/useUser";
import Loader from "src/components/shared/Loader";
import Admin from "src/pages/Admin";
import AdminMeetup from "./pages/Admin/AdminMeetup";
import AdminEditMeetup from "./pages/Admin/AdminEditMeetup";
import AdminDeleteMeetup from "./pages/Admin/AdminDeleteMeetup";
import AdminCreateMeetup from "./pages/Admin/AdminCreateMeetup";

export default function Routes() {
  const user = useUser();
  const loggedIn = user.isAuthenticated();
  const authHandler = (render) => {
    return !loggedIn ? <Redirect to="/" /> : render;
  };

  const authAdminHandler = (render) => {
    return !loggedIn || user.data.isAdmin !== true ? <Error404 /> : render;
  };
  return (
    <>
      {user.isUnknow() ? (
        <Loader />
      ) : (
        <HashRouter
          basename={
            process.env.NODE_ENV === "production" ? "/santander-meetup" : "/"
          }
        >
          <Switch>
            <Route exact path={"/"}>
              {loggedIn ? <Redirect to={ROUTER_PATHS.meetups} /> : <Login />}
            </Route>
            <Route exact path={ROUTER_PATHS.meetups}>
              {authHandler(<Meetups />)}
            </Route>
            <Route path={ROUTER_PATHS.meetup_details}>
              {authHandler(<Meetup />)}
            </Route>
            <Route path={ROUTER_PATHS.admin_meetups}>
              {authAdminHandler(
                <Switch>
                  <Route
                    exact
                    path={ROUTER_PATHS.admin_meetups}
                    component={Admin}
                  />
                  <Route
                    exact
                    path={ROUTER_PATHS.admin_meetups_details}
                    component={AdminMeetup}
                  />
                  <Route
                    exact
                    path={ROUTER_PATHS.admin_meetups_create}
                    component={AdminCreateMeetup}
                  />
                  <Route
                    exact
                    path={ROUTER_PATHS.admin_meetups_edit}
                    component={AdminEditMeetup}
                  />
                  <Route
                    exact
                    path={ROUTER_PATHS.admin_meetups_delete}
                    component={AdminDeleteMeetup}
                  />
                  <Route path="*">
                    <Error404 isAdmin />
                  </Route>
                </Switch>
              )}
            </Route>
            <Route path="*">
              <Error404 />
            </Route>
          </Switch>
        </HashRouter>
      )}
    </>
  );
}
