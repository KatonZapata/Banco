import { CuentaAhorros } from './js/clases.js/CuentaAhorros.js';
import { CuentaCorriente } from './js/clases.js/CuentaCoriente.js'; // corregido el typo
import { obtenerDeStorage, guardarEnStorage } from './js/util.js/localStorage.js';
import { reconstruirClienteConCuentas } from './js/util.js/restaurar.js';

// Obtener cliente logueado y reconstruirlo
const clienteActivoJSON = sessionStorage.getItem("logeo");
const logeado = reconstruirClienteConCuentas(JSON.parse(clienteActivoJSON));
const cuentaOrigen = logeado.cuentas[0];

// Obtener todos los clientes
const clientesJSON = obtenerDeStorage("clientes");
const clientes = clientesJSON.map(reconstruirClienteConCuentas);

// Mostrar datos actuales en el formulario
document.getElementById("nombre").value = logeado.nombre;
document.getElementById("apellido").value = logeado.apellido;
document.getElementById("direccion").value = logeado.direccion;

// Mostrar tipo y número de cuenta actual al mostrar sección nueva cuenta
const toggleCheckbox = document.getElementById("toggleCuenta");
const seccionCuenta = document.getElementById("nuevaCuentaSection");

toggleCheckbox.addEventListener("change", () => {
  seccionCuenta.style.display = toggleCheckbox.checked ? "block" : "none";

  document.getElementById("tipoCuentaActual").textContent = cuentaOrigen.tipoCuenta;
  document.getElementById("numeroCuentaActual").textContent = cuentaOrigen.numeroCuenta;

  if (toggleCheckbox.checked) {
    document.getElementById("nuevoTipoCuenta").value = 
      cuentaOrigen.tipoCuenta === "Ahorros" ? "Corriente" : "Ahorros";
  }
});

// Botón para agregar nueva cuenta
document.getElementById("btnAgregarCuenta").addEventListener("click", function () {
  if (!toggleCheckbox.checked) return;

  const nuevoTipoCuenta = document.getElementById("nuevoTipoCuenta").value;
  let nuevaCuenta;

  if (nuevoTipoCuenta === "Ahorros") {
    nuevaCuenta = new CuentaAhorros(generarNumeroCuentaUnico(obtenerDeStorage("cuentas")));
  } else {
    nuevaCuenta = new CuentaCorriente(generarNumeroCuentaUnico(obtenerDeStorage("cuentas")));
  }

  logeado.agregarCuenta(nuevaCuenta);

  const clientesActualizados = clientes.map(c =>
    c.usuario === logeado.usuario ? logeado : c
  );

  guardarEnStorage("clientes", clientesActualizados);
  mostrarMensaje("¡Cuenta agregada exitosamente!", true);
});

// Botón para actualizar datos del cliente
document.getElementById("btnGuardarCambios").addEventListener("click", function () {
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const direccion = document.getElementById("direccion").value.trim();

  if (!nombre || !apellido || !direccion) {
    return mostrarMensaje("Por favor, completa todos los campos.", false);
  }

  // Actualizar información
  logeado.nombre = nombre;
  logeado.apellido = apellido;
  logeado.direccion = direccion;

  // Guardar en localStorage
  const clientesActualizados = clientes.map(c =>
    c.usuario === logeado.usuario ? logeado : c
  );
  guardarEnStorage("clientes", clientesActualizados);

  // Limpiar propiedades que puedan causar error al serializar
  logeado.cuentas.forEach(c => delete c.propietario);

  // Actualizar sessionStorage
  sessionStorage.setItem("logeo", JSON.stringify(logeado));

  mostrarMensaje("¡Datos actualizados exitosamente!", true);
});

// Botón para regresar
document.getElementById("btnRegresar").addEventListener("click", function () {
  window.location.href = "./menuPpal.html";
});

// Generar número de cuenta único
function generarNumeroCuentaUnico(cuentasExistentesRaw) {
  const cuentasExistentes = Array.isArray(cuentasExistentesRaw) ? cuentasExistentesRaw : [];

  let numero;
  let existe = true;
  do {
    const aleatorio = Math.floor(1000000000 + Math.random() * 9000000000);
    numero = "CU" + aleatorio;
    existe = cuentasExistentes.some(c => c.numeroCuenta === numero);
  } while (existe);
  return numero;
}

// Mostrar mensaje en modal y redirigir después de unos segundos
function mostrarMensaje(mensaje, exitoso) {
  document.getElementById("mensajeRegistro").textContent = mensaje;
  document.getElementById("registroModal").classList.remove("oculto");
  document.getElementById("actualizarForm").style.display = "none";

  setTimeout(() => {
    document.getElementById("actualizarForm").reset();
    document.getElementById("actualizarForm").style.display = "block";
    document.getElementById("registroModal").classList.add("oculto");
    window.location.href = "./menuPpal.html";
  }, 4000);
}
