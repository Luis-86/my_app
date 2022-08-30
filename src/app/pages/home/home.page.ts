import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  listaMenu: menu[] = [
    {
      ruta: "/empleados",
      nombre: "Registrar Empleado",
      icono: "person-circle-outline",
    },

    {
      ruta: "/list-empleados",
      nombre: "Lista Empleados",
      icono: "list-circle-outline",
     
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}

interface menu {
  ruta: string;
  nombre: string;
  icono: string;
}