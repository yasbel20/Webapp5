// Guarda la sesión del usuario en localmente
export const saveUserSession = (userData,id) => {
    localStorage.setItem('userSession', JSON.stringify({userData, id}));
};

// Actualiza solo los diamantes del usuario y guarda en localStorage
export const updateUserSession = (userData, id, nuevosDiamantes) => {
  const datosActualizados = { ...userData, diamantes: nuevosDiamantes };
  saveUserSession(datosActualizados, id);
};

// Obtiene la sesión del usuario desde localStorage
export const getUserSession = () => {
    const data = localStorage.getItem('userSession');
    return data ? JSON.parse(data) : null;
};

// Elimina la sesión del usuario
export const clearUserSession = () => {
    localStorage.removeItem('userSession');
    window.location.href = '/';
    console.log('cerrado');
    
};
