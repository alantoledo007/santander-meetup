import { Route, Switch } from "react-router-dom";
import Home from "src/pages/Home";
import Meetups from "src/pages/Meetups";
import { ROUTER_PATHS } from "src/core/constants";
import Error404 from "src/pages/Error404";

export default function Routes() {
  return (
    <>
      <Switch>
        <Route exact path={"/"}>
          <Home />
        </Route>
        <Route path={ROUTER_PATHS.meetups}>
          <Meetups />
        </Route>
        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </>
  );
}
