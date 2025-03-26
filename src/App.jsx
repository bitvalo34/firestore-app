// Importar las bibliotecas y componentes necesarios
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
} from "@mui/material";
import HomePage from "./pages/HomePage";
import EditRecipePage from "./pages/EditRecipePage";

// Configuración del tema para estilizar la aplicación
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // azul moderno
    },
    secondary: {
      main: "#f50057", // rosa vibrante para acentos
    },
    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // quitar mayúsculas automáticas
          borderRadius: "8px",
          padding: "10px 20px",
          fontWeight: "bold",
        },
      },
    },
  },
});

// Componente principal de la aplicación con las rutas
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/edit/:id" element={<EditRecipePage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
