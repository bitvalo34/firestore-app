// Importar las bibliotecas y componentes necesarios
import React from "react";
import { Container, Button, Box } from "@mui/material";
import RecipeList from "../components/RecipeList";
import { useNavigate } from "react-router-dom";

// Componente principal de la página de inicio
const HomePage = () => {
  const navigate = useNavigate(); // Hook para navegar entre rutas

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={() => navigate("/edit/new")}>
          Crear Receta
        </Button>
      </Box>
      <RecipeList />
    </Container>
  );
};

export default HomePage;
