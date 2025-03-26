// Importamos las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Obtenemos la configuración de Firebase desde variables de entorno
const firebaseConfig = {
  apiKey: "AIzaSyDT1y8fvABwtuiP-dGxAw5IgbxfPmSgr6k", // Clave API de Firebase
  authDomain: "firestore-lab10-ca4d5.firebaseapp.com", // Dominio de autenticación
  projectId: "firestore-lab10-ca4d5", // ID del proyecto
  storageBucket: "firestore-lab10-ca4d5.firebasestorage.app", // Bucket de Cloud Storage
  messagingSenderId: "352209205010", // ID del emisor de mensajes
  appId: "1:352209205010:web:d7c8ed6fec3eb1d58125cb", // ID de la aplicación
};

// Inicializamos la aplicación de Firebase
const app = initializeApp(firebaseConfig);
// Obtenemos la instancia de Firestore para la base de datos
const db = getFirestore(app);
// Obtenemos la instancia de Storage para la subida de imágenes
const storage = getStorage(app);
// Exportamos las instancias para usarlas en otros archivos
export { db, storage };
