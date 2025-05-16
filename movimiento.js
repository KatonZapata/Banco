import { obtenerDeStorage } from './js/util.js/localStorage.js';
import { reconstruirClienteConCuentas } from './js/util.js/restaurar.js';
import { obtenerDeSession } from './js/util.js/sessionStorage.js';

// Mostrar el nombre del cliente logueado en una barra de bienvenida
const clienteActivoJSON = obtenerDeSession("logeo");
const logeado = reconstruirClienteConCuentas(clienteActivoJSON);
const cuenta = logeado.cuentas[0];

// Mostrar información básica del cliente
document.getElementById("bienvenida").innerHTML = `
  Bienvenido, ${logeado.nombre}<br>
  Cuenta: ${cuenta.numeroCuenta}<br>
  Saldo: $${cuenta.saldo.toFixed(2)}
`;

// Obtener la referencia a la tabla
const cuerpoTabla = document.getElementById("cuerpoTabla");

// Verificar si hay movimientos antes de agregar filas
if (cuenta.movimientos && cuenta.movimientos.length > 0) {
  cuenta.movimientos.forEach(mov => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${mov.tipo}</td>
      <td>$${mov.monto.toFixed(2)}</td>
      <td>${mov.fecha}</td>
      <td>${mov.hora}</td>
    `;

    cuerpoTabla.appendChild(fila);
  });
} else {
  console.log("No hay movimientos para mostrar.");
}