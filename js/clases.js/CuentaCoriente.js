import { Cuenta } from './Cuenta.js';

export class CuentaCorriente extends Cuenta {
  constructor(numeroCuenta, saldoInicial = 0) {
    super(numeroCuenta, saldoInicial);
    this.tipoCuenta = "Corriente";
    this.limiteSobregiro = 500000;
  }

  realizarRetiro(monto) {
    if (this.saldo + this.limiteSobregiro >= monto) {
      this.saldo -= monto;
      this.registrarMovimiento("Retiro", monto);
    }
  }
}

