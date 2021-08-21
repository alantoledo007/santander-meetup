import { CssBaseline, ThemeProvider } from "@material-ui/core";
import moment from "moment";
import Routes from "src/Routes";
import theme from "src/styles/theme";
import "src/firebase";
import store from "src/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";

moment.locale("es");

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <CssBaseline />
          <Routes />
        </ToastProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
