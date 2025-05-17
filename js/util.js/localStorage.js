/* export function guardarEnStorage(clave, datos) {
    localStorage.setItem(clave, JSON.stringify(datos));
  }
  
  export function obtenerDeStorage(clave) {
    return JSON.parse(localStorage.getItem(clave)) || [];
  }
   */
  
  // Guarda datos en localStorage, eliminando ciclos (como 'propietario')
export function guardarEnStorage(clave, datos) {
  const datosSinCircular = JSON.parse(JSON.stringify(datos, (key, value) => {
    if (key === 'propietario') return undefined;
    return value;
  }));
  localStorage.setItem(clave, JSON.stringify(datosSinCircular));
}

 export function obtenerDeStorage(clave) {
  const data = localStorage.getItem(clave);
  return data ? JSON.parse(data) : [];
}



