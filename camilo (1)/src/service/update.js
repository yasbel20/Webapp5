import { db } from './firebase';  // Ajusta la ruta según donde tengas tu configuración
import { ref, update } from "firebase/database";

export async function setDiamantes(uid, camposParaActualizar) {
  const userRef = ref(db, `users/${uid}`);
  
  return update(userRef, camposParaActualizar)
    .then(() => {
      console.log("Campos actualizados correctamente");
    })
    .catch((error) => {
      console.error("Error actualizando campos:", error);
      throw error;  // Re-lanzar el error si quieres manejarlo fuera
    });
}