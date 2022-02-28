// npm i @material-ui/styles;

import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1a237e",
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          textTransform: "none",
        },
      },
    },
  },
});
