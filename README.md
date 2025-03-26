# firestore-app
Lab 10 of Firestore app.

# Recipe Manager
Esta aplicación en React permite gestionar recetas mediante operaciones CRUD (crear, leer, actualizar y eliminar). Además, integra Firebase Firestore para almacenar los datos de las recetas y Firebase Cloud Storage para subir imágenes asociadas a cada receta.

## Enlace a CodeSandbox

Puedes probar la aplicación en vivo usando este enlace:
[CodeSandbox Live Preview](https://codesandbox.io/p/sandbox/8f48mj)

## Cómo Ejecutar la Aplicación Localmente

Sigue estos pasos para clonar y ejecutar el proyecto en tu máquina:

1. **Clona el repositorio:**

   git clone https://github.com/bitvalo34/firestore-app

   cd firestore-app

2. **Instala las dependencias:**

   npm install

3. **Ejecuta la aplicación:**

   npm run dev

   La aplicación se abrirá en http://localhost:3000 en tu navegador.

## Ejemplos de Uso
A continuación, se detallan algunos casos de uso típicos de la aplicación:

**Ejemplo 1: Crear una Nueva Receta**
1. Ingresar Datos:

   - Ingresa el título, por ejemplo, "Pasta al Pesto".

   - Escribe la descripción con los ingredientes y pasos.

   - Selecciona una imagen haciendo clic en el botón "Seleccionar Imagen".

2. Enviar el Formulario:

   - Haz clic en el botón "Crear Receta".

   - La receta se guarda en Firestore y la imagen se sube a Cloud Storage; la URL de la imagen se almacena junto con los datos de la receta.

   - La receta aparecerá en la lista de recetas (actualización en tiempo real).

**Ejemplo 2: Editar una Receta Existente**
1. Seleccionar la Receta:

   - En la lista de recetas, haz clic en el botón "Editar" en la tarjeta de la receta que deseas modificar.

2. Modificar Datos:

   - Cambia el título, la descripción o selecciona una nueva imagen.

   - Haz clic en "Actualizar Receta" para guardar los cambios.

3. Visualizar Cambios:

   - La receta se actualiza en Firestore y se refleja inmediatamente en la lista.

**Ejemplo 3: Eliminar una Receta**
1. Eliminar la Receta:

   - En cada tarjeta de receta, haz clic en el botón "Eliminar".

   - El documento correspondiente se borra de Firestore y la receta desaparece de la lista en tiempo real.