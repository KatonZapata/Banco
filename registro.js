//importacion de clases, metodos y funciones
import { Cliente } from './clases/Cliente.js';
import { CuentaAhorros } from './clases/CuentaAhorros.js';
import { CuentaCorriente } from './clases/CuentaCorriente.js';
import { obtenerDeStorage, guardarEnStorage } from './utils/storage.js';
import { reconstruirClienteConCuentas } from './utils/restaurar.js';

//manipulacion del DOM
document.getElementById("registroForm").addEventListener("submit", function (e) {
  e.preventDefault();

  //recopilacion de la informacion del formulario html en variables
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const identificacion = document.getElementById("identificacion").value.trim();
  const usuario = document.getElementById("usuario").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const tipoCuenta = document.getElementById("tipoCuenta").value;

  //validaciones 
  if (!password && !confirmPassword) {
    alert("La contraseña no puede estar vacía.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  if (password.length < 4) {
    alert("La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  //utilizacion del localStorage. 
  const clientesJSON = obtenerDeStorage("clientes");
  const clientes = clientesJSON.map(reconstruirClienteConCuentas);

  // validacion de la informacion obtenida con la del localStorge
  const usuarioExistente = clientes.find(c => c.usuario === usuario);
  if (usuarioExistente) {
    alert("El nombre de usuario ya está en uso.");
    return;
  }

  const numeroCuenta = generarNumeroCuentaUnico(obtenerDeStorage("cuentas"));
  const cuenta = tipoCuenta === "ahorros"
    ? new CuentaAhorros(numeroCuenta)
    : new CuentaCorriente(numeroCuenta);

  const cliente = new Cliente(nombre, apellido, direccion, identificacion, usuario, password);
  cliente.agregarCuenta(cuenta);
  //insersion de datos en clientes y cuentas
  clientes.push(cliente);
  const cuentas = obtenerDeStorage("cuentas");
  cuentas.push(cuenta);
//guardado en localStorage
  guardarEnStorage("clientes", clientes);
  guardarEnStorage("cuentas", cuentas);

  alert(`Registro exitoso.\nNúmero de cuenta: ${numeroCuenta}`);
  document.getElementById("registroForm").reset();
});
//funcion de generacion de numeros de cuenta de manera aleatoria
function generarNumeroCuentaUnico(cuentasExistentes) {
  let numero;
  let existe = true;
  do {
    const aleatorio = Math.floor(1000000000 + Math.random() * 9000000000);
    numero = "CU" + aleatorio;
    existe = cuentasExistentes.some(c => c.numeroCuenta === numero);
  } while (existe);
  return numero;
}
