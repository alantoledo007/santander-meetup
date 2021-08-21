import { unstable_createMuiStrictModeTheme as createTheme } from "@material-ui/core";
import { esES } from "@material-ui/core/locale";

export const colors = {
  primary: "#E90000",
};

const theme = createTheme(
  {
    palette: {
      primary: {
        main: colors.primary,
      },
    },
  },
  esES
);

export default theme;
