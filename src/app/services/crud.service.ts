import { Injectable } from '@angular/core';
import { Empleado } from '../interfaces/empleado';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  bd: string = 'empleados';

  public listaEmpleados: Array<Empleado> = [];

  objEmpleado: Empleado = {
    id: 1,
    nombres: '',
    apellidos: '',
    cedula: null,
    cargo: '',
    telefono: null,
    sueldo: 0
  };
  Empleado: any;

  getEmpleados() {
    this.listaEmpleados = JSON.parse(localStorage.getItem(this.bd));
    if (this.listaEmpleados == null) {
      this.listaEmpleados = [];
      //localStorage.setItem(this.bd, JSON.stringify(this.objContacto));
      console.log("base de datos creada");
    } else {
      console.log(this.listaEmpleados);
    }
    return this.listaEmpleados;
  }

  guardarEmpleado(datoEmpleado: Empleado) {
    this.listaEmpleados.unshift(datoEmpleado);
    // this.listaContactos.push(datoContacto);
    localStorage.setItem(this.bd, JSON.stringify(this.listaEmpleados));
  }
  actualizarEmpleado(datoEmpleado: Empleado, pos: number) {
    this.listaEmpleados[pos] = datoEmpleado;
    localStorage.setItem(this.bd, JSON.stringify(this.listaEmpleados));
  }
  eliminarEmpleado(pos) {
    this.listaEmpleados.splice(pos, 1);
    localStorage.setItem(this.bd, JSON.stringify(this.listaEmpleados));
  }

  constructor() { }
}

