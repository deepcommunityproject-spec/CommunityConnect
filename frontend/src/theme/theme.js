import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#e65100",
      light: "#ff833a",
      dark: "#ac1900",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1a1a2e",
      light: "#44456a",
      dark: "#000007",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f9f9f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a2e",
      secondary: "#555",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
  },
});

export default theme;