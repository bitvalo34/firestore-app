// Importar las bibliotecas y componentes necesarios
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

// Componente que muestra un elemento individual de receta
const RecipeItem = ({ recipe }) => {
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Función para manejar la edición de una receta
  const handleEdit = () => {
    // Navega a la página de edición con el ID de la receta como parámetro
    navigate(`/edit/${recipe.id}`, { state: recipe });
  };

  // Función para manejar la eliminación de una receta de Firestore
  const handleDelete = async () => {
    try {
      // Intenta eliminar el documento de la colección 'recipes' usando su ID
      await deleteDoc(doc(db, "recipes", recipe.id));
    } catch (error) {
      console.error("Error al eliminar la receta: ", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      {recipe.imageUrl && (
        <CardMedia
          component="img"
          height="140"
          image={recipe.imageUrl}
          alt={recipe.title}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleEdit}>
          Editar
        </Button>
        <Button size="small" onClick={handleDelete}>
          Eliminar
        </Button>
      </CardActions>
    </Card>
  );
};

export default RecipeItem;
