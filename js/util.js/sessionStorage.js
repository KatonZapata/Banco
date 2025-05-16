

export function guardarSessionStorage(clave, datos) {
  const datosSinCircular = JSON.parse(JSON.stringify(datos, (key, value) => {
    if (key === 'propietario') return undefined;
    return value;
  }));
  sessionStorage.setItem(clave, JSON.stringify(datosSinCircular));
}

export function obtenerDeSession(clave) {
  return JSON.parse(sessionStorage.getItem(clave)) || []; 
}
