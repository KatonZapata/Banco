//IMPORTACIONES
import { guardarEnStorage, obtenerDeStorage } from './js/util.js/localStorage.js';
import { reconstruirClienteConCuentas } from './js/util.js/restaurar.js';


document.addEventListener('DOMContentLoaded', () => {
    const formularioConsignacion = document.getElementById('monto');
    const inputMonto = document.getElementById('valor');
    const botonRegresar = document.getElementById('btnRegresar');
    
    formularioConsignacion.addEventListener('submit', (evento) => {
        evento.preventDefault();

        

        const montoConsignacion = parseFloat(inputMonto.value);

        if (isNaN(montoConsignacion) || montoConsignacion <= 0) {
            alert('Por favor, ingresa un monto válido y positivo para consignar.');
            return;
        }

        const nombreUsuarioLoggeado = localStorage.getItem('loggedInUsername');

        if (!nombreUsuarioLoggeado) {
            alert('Error: No hay un usuario loggeado. Por favor, inicia sesión.');
            return;
        }

        const usuariosPlanos = obtenerDeStorage('clientes');

        const indiceUsuarioPlano = usuariosPlanos.findIndex(usuario => usuario.usuario === nombreUsuarioLoggeado);

        if (indiceUsuarioPlano === -1) {
             alert('Error: Usuario loggeado no encontrado en la base de datos.');
             localStorage.removeItem('loggedInUsername');
             return;
        }

        const usuarioPlanoActual = usuariosPlanos[indiceUsuarioPlano];

        const clienteInstancia = reconstruirClienteConCuentas(usuarioPlanoActual);

        if (!clienteInstancia.cuentas || clienteInstancia.cuentas.length === 0) {
            alert('Error: El cliente no tiene cuentas asociadas.');
            return;
        }
        const cuentaObjetivoInstancia = clienteInstancia.cuentas[0];


        cuentaObjetivoInstancia.realizarConsignacion(montoConsignacion);

        const cuentaPlanaObjetivo = usuarioPlanoActual.cuentas[0];
        cuentaPlanaObjetivo.saldo = cuentaObjetivoInstancia.saldo;
        cuentaPlanaObjetivo.movimientos = cuentaObjetivoInstancia.movimientos;

        guardarEnStorage('clientes', usuariosPlanos);

        alert(`Consignación exitosa. Has consignado $${montoConsignacion.toFixed(2)}. Tu nuevo saldo es: $${cuentaObjetivoInstancia.saldo.toFixed(2)}`);

        inputMonto.value = '';
    });
        botonRegresar.addEventListener('click', () => {
        window.location.href = '/html/menuPpal.html';
    });

});