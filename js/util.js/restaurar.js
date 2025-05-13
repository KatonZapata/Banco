import { Cliente } from '../clases/Cliente.js';
import { Cuenta } from '../clases/Cuenta.js';
import { CuentaAhorros } from '../clases/CuentaAhorros.js';
import { CuentaCorriente } from '../clases/CuentaCorriente.js';

export function reconstruirCuenta(jsonCuenta) {
  let cuenta;
  if ('interesMensual' in jsonCuenta) {
    cuenta = new CuentaAhorros(jsonCuenta.numeroCuenta, jsonCuenta.saldo);
    cuenta.retirosRealizados = jsonCuenta.retirosRealizados || 0;
  } else if ('limiteSobregiro' in jsonCuenta) {
    cuenta = new CuentaCorriente(jsonCuenta.numeroCuenta, jsonCuenta.saldo);
  } else {
    cuenta = new Cuenta(jsonCuenta.numeroCuenta, jsonCuenta.saldo);
  }
  cuenta.movimientos = jsonCuenta.movimientos || [];
  return cuenta;
}

export function reconstruirClienteConCuentas(jsonCliente) {
  const cliente = new Cliente(
    jsonCliente.nombre,
    jsonCliente.apellido,
    jsonCliente.direccion,
    jsonCliente.identificacion,
    jsonCliente.usuario,
    jsonCliente.password
  );
  if (Array.isArray(jsonCliente.cuentas)) {
    jsonCliente.cuentas.forEach(jsonCuenta => {
      const cuenta = reconstruirCuenta(jsonCuenta);
      cliente.agregarCuenta(cuenta);
    });
  }
  return cliente;
}
