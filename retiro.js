import { obtenerDeStorage,guardarEnStorage} from './js/util.js/localStorage.js';
import { reconstruirClienteConCuentas } from './js/util.js/restaurar.js';
import { obtenerDeSession,guardarSessionStorage} from './js/util.js/sessionStorage.js';
import { Cuenta } from './js/clases.js/Cuenta.js';

document.getElementById("monto").addEventListener("submit", function (e) {
  e.preventDefault();

  const clienteActivoJSON = sessionStorage.getItem("logeo");
  const logeado = reconstruirClienteConCuentas(JSON.parse(clienteActivoJSON));
  const cuenta = logeado.cuentas[0];

  const valor = Number(document.getElementById("valor").value.trim());

  if (!isNaN(valor) && valor > 0) {
    cuenta.realizarRetiro(valor);
     guardarEnStorage("cuentas", cuenta);
     guardarEnStorage("clientes", logeado);

    // 🔧 Quitar referencia circular antes de guardar
    logeado.cuentas.forEach(c => delete c.propietario);


    // ✅ Guardar sin error
    sessionStorage.setItem("logeo", JSON.stringify(logeado));
    

    console.log("Retiro realizada. Nuevo saldo:", cuenta.saldo);
  } else {
    alert("Ingrese un monto válido.");
  }


   // Mostrar modal de éxito
document.getElementById("mensajeRegistro").textContent =
  `Tu Retiro por valor de: ${valor} Ha sido exitosa `;

document.getElementById("registroModal").classList.remove("oculto");

// Ocultar el formulario temporalmente (opcional)
document.getElementById("monto").style.display = "none";

// Reiniciar formulario y mostrar de nuevo luego de 4 segundos
setTimeout(() => {
document.getElementById("monto").reset();
document.getElementById("monto").style.display = "block";
document.getElementById("registroModal").classList.add("oculto");
window.location.href = "/html/menuPpal.html";
}, 1000);

});

document.getElementById('btnRegresar').addEventListener('click', function(){

    window.location.href = '/html/menuPpal.html'
})
