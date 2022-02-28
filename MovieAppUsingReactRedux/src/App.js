import { ThemeProvider } from "@material-ui/styles";
import Routing from "./components/routing/Routing";
import { theme } from "./theme";
import { makeStyles } from "@material-ui/core";
import "./App.scss";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routing />
      </div>
    </ThemeProvider>
  );
}

export default App;
