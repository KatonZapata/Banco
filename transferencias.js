import { obtenerDeStorage, guardarEnStorage } from './js/util.js/localStorage.js';
import { reconstruirClienteConCuentas } from './js/util.js/restaurar.js';

// Obtener cliente logueado
const clienteActivoJSON = sessionStorage.getItem("logeo");
const logeado = reconstruirClienteConCuentas(JSON.parse(clienteActivoJSON));
const cuentaOrigen = logeado.cuentas[0];

const clientesJSON = obtenerDeStorage("clientes");
const clientes =clientesJSON.map(reconstruirClienteConCuentas)
// Mostrar cuenta origen en input
document.getElementById("cuentaOrigen").value = `${cuentaOrigen.numeroCuenta}`;

// Escuchar el envío del formulario
document.getElementById("registroForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const cuentaDestino = document.getElementById("cuentaDestino").value;
  const valor = parseFloat(document.getElementById("valor").value.trim());

  // Validar monto
if (isNaN(valor) || valor <= 0) {
  return mostrarMensaje("¡Monto inválido!", false);
}

// Buscar cuenta destino en todos los clientes
let cuentaDestinoObj = null;
let clienteDestino = null;

for (const cliente of clientes) {
  const cuenta = cliente.cuentas.find(c => c.numeroCuenta === cuentaDestino);
  if (cuenta) {
    cuentaDestinoObj = cuenta;
    clienteDestino = cliente;
    break;
  }
}

if (!cuentaDestinoObj) {
  return mostrarMensaje(`La cuenta destino ${cuentaDestino} no existe.`, false);
}

// Verificar saldo
if (cuentaOrigen.saldo < valor) {
  return mostrarMensaje("Saldo insuficiente para realizar la transferencia.", false);
}

// Realizar transferencia
cuentaOrigen.realizarRetiro(valor);
cuentaDestinoObj.realizarConsignacion(valor);

// Guardar en localStorage
const clientesActualizados = clientes.map(c => {
  if (c.usuario === logeado.usuario) return logeado;
  if (c.usuario === clienteDestino.usuario) return clienteDestino;
  return c;
});

guardarEnStorage("clientes", clientesActualizados);

// Guardar sesión actualizada
logeado.cuentas.forEach(c => delete c.propietario);
sessionStorage.setItem("logeo", JSON.stringify(logeado));

mostrarMensaje("¡Transferencia exitosa!", true);
});

// Función para mostrar mensaje y redirigir
function mostrarMensaje(mensaje, exito) {
  document.getElementById("mensajeRegistro").textContent = mensaje;
  document.getElementById("registroModal").classList.remove("oculto");
  document.getElementById("registroForm").style.display = "none";

  setTimeout(() => {
    document.getElementById("registroForm").reset();
    document.getElementById("registroForm").style.display = "block";
    document.getElementById("registroModal").classList.add("oculto");
    window.location.href = "./menuPpal.html";
  }, 4000);
}

// Botón regresar
document.getElementById("btnRegresar").addEventListener("click", function () {
  window.location.href = "./menuPpal.html";
});
