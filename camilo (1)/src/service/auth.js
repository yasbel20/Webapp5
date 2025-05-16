import { ref, get } from "firebase/database";
import { db } from "./firebase"; // tu archivo firebase.js
import {saveUserSession} from '../service/session';

export const getDatosUsuario = async (uid) => {
  try {
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      throw new Error("No se encontraron datos del usuario.");
    }

    const datosUsuario = snapshot.val();
    saveUserSession(datosUsuario, uid);
      
    return datosUsuario;
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error.message);
    return null;
  }
};

