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

    // 🔧 Quitar referencia circular antes de guardar
    logeado.cuentas.forEach(c => delete c.propietario);


    // ✅ Guardar sin error
    sessionStorage.setItem("logeo", JSON.stringify(logeado));
    

    console.log("Retiro realizada. Nuevo saldo:", cuenta.saldo);
  } else {
    alert("Ingrese un monto válido.");
  }
});
