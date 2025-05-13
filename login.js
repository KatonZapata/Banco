import { obtenerDeStorage} from './js/util.js/localStorage.js';
import { reconstruirClienteConCuentas } from './js/util.js/restaurar.js';

let intentos =0;
const MAX_INTENTOS = 3;

document.getElementById("loginForm").addEventListener("submit",function(e){
    e.preventDefault();

    //obtener info del los input
    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    //validaion que los campos no esten vacios
    if(!usuario && !password){
        alert("Usuario o contraseña estan vacios")
        return;
    }

    //obtener datos del localStorage
    const clientesJSON = obtenerDeStorage("clientes");
    const clientes =clientesJSON.map(reconstruirClienteConCuentas);

    const cliente = clientes.find(x => x.usuario === usuario && x.password === password);

    if (cliente) {
        sessionStorage.setItem("clienteActivo", JSON.stringify(cliente));

        // Mostrar mensaje de bienvenida
        document.getElementById("mensajeBienvenida").textContent =
        `Hola, ${cliente.nombre}. Serás redirigido al menú en breve...`;

        document.getElementById("bienvenidaModal").classList.remove("oculto");

        // Redirigir después de 3 segundos
        setTimeout(() => {
        window.location.href = "menu.html";
        }, 3000);

    }else{
        intentos ++
        if (intentos >= MAX_INTENTOS) {
            alert("Su cuenta esta bloqueada, favor comuniquese con su banco")
            document.getElementById("loginForm").reset();
        }else{
            alert(`Credenciales incorrectas. Intento ${intentos}/${MAX_INTENTOS}`);
        }
    }

})
