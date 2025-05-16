export class Cliente {
  constructor(nombre, apellido, direccion, identificacion, usuario, password) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.direccion = direccion;
    this.identificacion = identificacion;
    this.usuario = usuario;
    this.password = password;
    this.cuentas = [];
  }

  agregarCuenta(cuenta) {
    this.cuentas.push (cuenta);
    cuenta.propietario = this;
  }
}
