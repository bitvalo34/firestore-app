// Importar las bibliotecas y componentes necesarios
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import RecipeItem from "./RecipeItem";
import { Box, Typography, Grid } from "@mui/material";

// Componente para mostrar una lista de todas las recetas en tiempo real
const RecipeList = () => {
  const [recipes, setRecipes] = useState([]); // Estado para almacenar la lista de recetas

  // Obtener recetas desde Firestore cuando el componente se monte
  useEffect(() => {
    // Configurar un listener en tiempo real para la colección 'recipes'
    const unsubscribe = onSnapshot(collection(db, "recipes"), (snapshot) => {
      // Convertir los documentos en un arreglo de objetos de recetas
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRecipes(list); // Actualizar el estado con la lista de recetas
    });
    // Eliminar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Recetas
      </Typography>
      <Grid container spacing={2}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <RecipeItem recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecipeList;
