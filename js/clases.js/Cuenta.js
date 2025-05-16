export class Cuenta {
  constructor(numeroCuenta, saldoInicial = 0) {
    this.tipoCuenta ="generica"
    this.numeroCuenta = numeroCuenta;
    this.saldo = saldoInicial;
    this.movimientos = [];
    this.propietario = null;
  }

  registrarMovimiento(tipo, monto) {
    const fecha = new Date();
    this.movimientos.push({
      tipo,
      monto,
      fecha: fecha.toLocaleDateString(),
      hora: fecha.toLocaleTimeString()
    });
  }

  realizarConsignacion(monto) {
    this.saldo += monto;
    this.registrarMovimiento("Consignación", monto);
  }

  realizarRetiro(monto) {
    if (this.saldo >= monto) {
      this.saldo -= monto;
      this.registrarMovimiento("Retiro", monto);
    }
  }
}

  