import useUser from "src/hooks/useUser";
import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Button,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { getUsernameFromEmail } from "src/core/utils";

const headerData = (auth, isAdmin) => {
  let data = [];
  if (auth) {
    if (isAdmin) data.push({ label: "Administrar", href: "/admin" });
    data = data.concat([
      {
        label: "Meetups",
        href: "/meetups",
      },
    ]);
  }
  return data;
};

export default function Header({ logout }) {
  const user = useUser();
  const [showDrawer, setShowDrawer] = useState(false);
  const loggedIn = user.isAuthenticated();
  const onLogout = () => {
    setShowDrawer(false);
    logout();
  };
  if (user.isUnknow()) return null;
  return (
    <header>
      <Box mb={3}>
        <AppBar position="static" color="primary">
          <Toolbar>
            {loggedIn && (
              <>
                <Hidden mdUp>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => setShowDrawer(true)}
                  >
                    <MenuIcon />
                  </IconButton>
                </Hidden>
                <Box mr={2}>
                  <strong>Hola, {getUsernameFromEmail(user.data.email)}</strong>
                </Box>
              </>
            )}
            <Box mx="auto">
              {!loggedIn && (
                <Button color={"inherit"} to={"/"} component={RouterLink}>
                  Santander Meetup
                </Button>
              )}
              <Hidden smDown>
                {headerData(loggedIn, user.data.isAdmin).map(
                  ({ label, href }) => (
                    <Button
                      key={label}
                      color={"inherit"}
                      to={href}
                      component={RouterLink}
                    >
                      {label}
                    </Button>
                  )
                )}
                {loggedIn && (
                  <Button color={"inherit"} onClick={onLogout}>
                    Salir
                  </Button>
                )}
              </Hidden>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={showDrawer}
          onClose={() => setShowDrawer(false)}
        >
          <List>
            {headerData(loggedIn, user.data.isAdmin).map(({ label, href }) => (
              <ListItem key={label} button component={RouterLink} to={href}>
                <ListItemText>{label}</ListItemText>
              </ListItem>
            ))}
          </List>
          <Divider />
          <ListItem button onClick={onLogout}>
            <ListItemText>Salir</ListItemText>
          </ListItem>
        </Drawer>
      </Box>
    </header>
  );
}
