//IMPORTACIONES
import { guardarEnStorage, obtenerDeStorage } from './js/util.js/localStorage.js';
import { reconstruirClienteConCuentas } from './js/util.js/restaurar.js';


document.addEventListener('DOMContentLoaded', () => {
    const formularioRetiro = document.getElementById('monto');
    const inputMonto = document.getElementById('valor');
    const botonRegresar = document.getElementById('btnRegresar');
    
    formularioRetiro.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const montoRetiro = parseFloat(inputMonto.value);

        if (isNaN(montoRetiro) || montoRetiro <= 0) {
            alert('Por favor, ingresa un monto válido mayor a cero.');
            return;
        }

        // Obtiene el nombre de usuario loggeado
        const nombreUsuarioLoggeado = localStorage.getItem('loggedInUsername');

        if (!nombreUsuarioLoggeado) {
            alert('Disculpa, no estas en un Usuario Logueado');
            return;
        }

        const usuariosPlanos = obtenerDeStorage('clientes');

        
        const indiceUsuarioPlano = usuariosPlanos.findIndex(usuario => usuario.usuario === nombreUsuarioLoggeado);

        if (indiceUsuarioPlano === -1) {
            alert('Error: Usuario loggeado no encontrado en la base de datos.');
            localStorage.removeItem('loggedInUsername'); 
            return;
        }

        // Obtener el objeto
        const usuarioPlanoActual = usuariosPlanos[indiceUsuarioPlano];

        // Reconstruir el objeto 
        const clienteInstancia = reconstruirClienteConCuentas(usuarioPlanoActual);

        
        if (!clienteInstancia.cuentas || clienteInstancia.cuentas.length === 0) {
            alert('Error: El cliente no tiene cuentas asociadas.');
            return;
        }
        const cuentaObjetivoInstancia = clienteInstancia.cuentas[0]; 


        // Validar saldo 
        if (montoRetiro > cuentaObjetivoInstancia.saldo) {
            alert(`Fondos insuficientes. Tu Saldo actual es: $${cuentaObjetivoInstancia.saldo.toFixed(2)}`);
            return;
        }

        cuentaObjetivoInstancia.realizarRetiro(montoRetiro);

        //Actualizar el objeto plano 
        const cuentaPlanaObjetivo = usuarioPlanoActual.cuentas[0]; 
        cuentaPlanaObjetivo.saldo = cuentaObjetivoInstancia.saldo; 
        cuentaPlanaObjetivo.movimientos = cuentaObjetivoInstancia.movimientos;


        // Guardar el array completo 
        guardarEnStorage('clientes', usuariosPlanos);

        
        alert(`Retiro exitoso. Has retirado $${montoRetiro.toFixed(2)}. Tu nuevo saldo es: $${cuentaObjetivoInstancia.saldo.toFixed(2)}`);

        
        inputMonto.value = '';

        });
        botonRegresar.addEventListener('click', () => {
            window.location.href = '/html/menuPpal.html';
        });
});