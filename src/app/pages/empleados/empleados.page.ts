import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Empleado } from '../../interfaces/empleado';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  public listaEmpleados: Array<Empleado> = [];

  empleado: Empleado;
  private path = 'Productos/';

  constructor(public met: CrudService) { }

  ngOnInit() {
    this.nuevoEmpleado();
    this.cargarDatos();
  }

  cargarDatos() {
    this.listaEmpleados = this.met.getEmpleados();
  }
  nuevoEmpleado() {
    this.empleado = {
      id: new Date().getTime(),
      nombres: '',
      apellidos: null,
      cedula: null,
      cargo: '',
      telefono: null,
      sueldo: 0
      
     
    }
  }
  editarEmpleado(item: Empleado) {
    this.empleado = item;
  }
  guardarEmpleado() {
    let existe: Boolean = false;
    var pos = 0;
    var i = 0;
    for (const item of this.listaEmpleados) {
      if (item.id == this.empleado.id) {
        existe = true;
        pos = i;
      }
      i++;
    }

    if (existe) {
      //actualizamos
      this.met.actualizarEmpleado(this.empleado, pos);
    } else {
      //guardamos
      this.met.guardarEmpleado(this.empleado);
    }

    this.nuevoEmpleado();
    this.cargarDatos();

  }
  eliminarEmpleado(pos) {
    this.met.eliminarEmpleado(pos);
    this.cargarDatos();
  }
}