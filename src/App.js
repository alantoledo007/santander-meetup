import { CssBaseline, ThemeProvider } from "@material-ui/core";
import moment from "moment";
import Routes from "src/Routes";
import theme from "src/styles/theme";
import "src/firebase";
import store from "src/redux/store";
import { Provider as ReduxProvider } from "react-redux";

moment.locale("es");

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
