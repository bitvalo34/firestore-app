import React, { useState } from "react";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const RecipeForm = ({ recipe, isEditing = false }) => {
  // Estados para los campos del formulario
  const [title, setTitle] = useState(recipe ? recipe.title : "");
  const [description, setDescription] = useState(
    recipe ? recipe.description : ""
  );
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  // Función para subir la imagen a Firebase Storage y obtener la URL
  const handleImageUpload = async (file) => {
    // Creamos una referencia en la carpeta 'recipes'
    const storageRef = ref(storage, `recipes/${file.name}`);
    // Subimos el archivo
    await uploadBytes(storageRef, file);
    // Obtenemos la URL de descarga
    return await getDownloadURL(storageRef);
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = recipe ? recipe.imageUrl : "";
    // Si se seleccionó una nueva imagen, se sube y se obtiene su URL
    if (imageFile) {
      imageUrl = await handleImageUpload(imageFile);
    }
    // Datos de la receta a enviar
    const recipeData = { title, description, imageUrl };

    try {
      if (isEditing) {
        // Actualizamos la receta existente usando su ID
        const recipeRef = doc(db, "recipes", recipe.id);
        await updateDoc(recipeRef, recipeData);
      } else {
        // Creamos una nueva receta en la colección 'recipes'
        await addDoc(collection(db, "recipes"), recipeData);
      }
      // Navegamos de regreso a la página principal
      navigate("/");
    } catch (error) {
      console.error("Error al enviar la receta: ", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {isEditing ? "Editar Receta" : "Crear Receta"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Título"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Descripción"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <Button variant="contained" component="label" sx={{ mb: 2 }}>
          {imageFile ? "Imagen seleccionada" : "Seleccionar Imagen"}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </Button>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            {isEditing ? "Actualizar Receta" : "Crear Receta"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default RecipeForm;
