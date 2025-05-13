import { obtenerDeStorage} from './js/util.js/localStorage.js';
import { reconstruirClienteConCuentas } from './js/util.js/restaurar.js';


// Mostrar el nombre del cliente logueado en una barra de bienvenida
const clienteActivoJSON = obtenerDeStorage("login");
const logeado = reconstruirClienteConCuentas("clienteActivoJSON")
console.log(logeado);




/* 
if (clienteActivoJSON) {
  const cliente = JSON.parse(clienteActivoJSON);
  document.getElementById("bienvenida").textContent = `Bienvenido, ${cliente.nombre}`;
  const movimientos = cliente.cue
}

// Datos simulados de movimientos


// Referencia al cuerpo de la tabla
const cuerpoTabla = document.querySelector("#tabla-movimientos tbody");

// Inyectar filas con datos
movimientos.forEach(mov => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${mov.tipo}</td>
        <td>$${mov.monto.toFixed(2)}</td>
        <td>${mov.fecha}</td>
        <td>${mov.hora}</td>
    `;

    cuerpoTabla.appendChild(fila);
}); */