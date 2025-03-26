// Importamos los hooks y componentes necesarios
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
// Importamos nuestro componente de formulario de receta
import RecipeForm from "../components/RecipeForm";
// Importamos funciones de Firestore para obtener y actualizar documentos
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const EditRecipePage = () => {
  // Obtenemos el parámetro 'id' de la URL
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(true);
  // Si el id es distinto de 'new', estamos editando; de lo contrario, es creación
  const isEditing = id !== "new";

  // Efecto para cargar los datos de la receta si estamos en modo edición
  useEffect(() => {
    if (isEditing) {
      const fetchRecipe = async () => {
        try {
          // Creamos la referencia al documento en Firestore
          const recipeRef = doc(db, "recipes", id);
          // Obtenemos el snapshot del documento
          const recipeSnap = await getDoc(recipeRef);
          if (recipeSnap.exists()) {
            // Actualizamos el estado con los datos obtenidos
            setRecipeData({ id, ...recipeSnap.data() });
          }
        } catch (error) {
          console.error("Error al obtener la receta:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchRecipe();
    } else {
      // Si se va a crear una nueva receta, ya no se necesita cargar datos
      setLoading(false);
    }
  }, [id, isEditing]);

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (data) => {
    try {
      if (isEditing) {
        // Actualizamos la receta existente
        const recipeRef = doc(db, "recipes", id);
        await updateDoc(recipeRef, data);
      } else {
        // Creamos una nueva receta en la colección 'recipes'
        await addDoc(collection(db, "recipes"), data);
      }
      // Navegamos de regreso a la página principal
      navigate("/");
    } catch (error) {
      console.error("Error al enviar la receta:", error);
    }
  };

  // Si la carga está en proceso, mostramos un indicador de progreso
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        {isEditing ? "Editar Receta" : "Crear Nueva Receta"}
      </Typography>
      {/* Renderizamos el formulario pasando los datos y el indicador de edición */}
      <RecipeForm
        onSubmit={handleSubmit}
        recipe={recipeData}
        isEditing={isEditing}
      />
    </Container>
  );
};

export default EditRecipePage;
