import { Cuenta } from './Cuenta.js';

export class CuentaAhorros extends Cuenta {
  constructor(numeroCuenta, saldoInicial = 0) {
    super(numeroCuenta, saldoInicial);
    this.tipoCuenta = "Ahorros";
    this.limiteRetiros = 5;
    this.retirosRealizados = 0;
    this.interesMensual = 0.01;
  }
}

