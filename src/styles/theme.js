import { createTheme } from "@material-ui/core";

export const colors = {
  primary: "#E90000",
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
  },
});

export default theme;
