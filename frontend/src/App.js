import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";
import AppRoutes from "./routes/AppRoutes";

/**
 * Main application entry point.
 * Wraps the entire application with the Material-UI ThemeProvider
 * and provides application-wide CSS baseline resets.
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline provides a consistent baseline to build upon */}
      <CssBaseline />
      
      {/* Main application routing configuration */}
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
