import { CssBaseline, ThemeProvider } from "@material-ui/core";
import moment from "moment";
import Routes from "src/Routes";
import theme from "src/styles/theme";
import "src/firebase";

moment.locale("es");

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
