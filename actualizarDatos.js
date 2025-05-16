import { obtenerDeStorage, guardarEnStorage } from './js/util.js/localStorage.js';
import { Cliente, CuentaAhorros, CuentaCorriente } from './js/modelo.js';
import { reconstruirClienteConCuentas } from './js/util.js/restaurar.js';
import { obtenerDeSession } from './js/util.js/sessionStorage.js';
import { mostrarModalExito } from './js/util.js/modal.js';
import { generarNumeroCuentaUnico } from './registro.js';

// Obtener el cliente activo desde sessionStorage
let clienteActivoJSON = obtenerDeSession("logeo");
let logeado = reconstruirClienteConCuentas(clienteActivoJSON);  
let cuenta = logeado.cuentas[0];

doocument.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();
  
  // Recopilación de la información del formulario HTML en variables
  document.getElementById("nombre").value = `${logeado.nombre}`;
  document.getElementById("apellido").value = `${logeado.apellido}`;
  document.getElementById("direccion").value = `${logeado.direccion}`;

  //activacion del checkbox
  const toggleCheckbox = document.getElementById("toggleCuenta");
  const seccionNuevaCuenta = document.getElementById("nuevaCuentaSection");

  toggleCheckbox.addEventListener("change", () => {
  seccionNuevaCuenta.style.display = toggleCheckbox.checked ? "block" : "none";
  if (toggleCheckbox.checked) {
    // Si el checkbox está activado, mostrar la sección de nueva cuenta
    seccionNuevaCuenta.style.display = "block";
    // Cargar los tipos de cuenta disponibles
    
    cargarTiposCuentaDisponibles();
  }
  });

});

function cargarTiposCuentaDisponibles() {
  const selectTipoCuenta = document.getElementById("tipoCuenta");
  selectTipoCuenta.innerHTML = ""; // Limpiar opciones existentes

  const tiposCuentas = [
    { nombre: "Ahorros", valor: "ahorros" },
    { nombre: "Corriente", valor: "corriente" }
  ];

  tiposCuentas.forEach(tipo => {
    const option = document.createElement("option");
    option.value = tipo.valor;
    option.textContent = tipo.nombre;
    selectTipoCuenta.appendChild(option);
  });  
}

