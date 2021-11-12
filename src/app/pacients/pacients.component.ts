import { Component } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Pacient {
  id: Number;
  nombres: String;
  apellidos: String;
  fecha_nac: Date;
  sexo: String;
  domicilio: String;
  tel_principal: Number;
  tel_secundario: Number;
  correo: String;
  fecha_reg: Date;
}

const PACIENTS_DATA: Pacient[] = [
  {
    id: 1,
    nombres: 'Edson Raul',
    apellidos: 'Cepeda Marquez',
    fecha_nac: new Date(),
    sexo: 'Hombre',
    domicilio: 'Rosa #347, Los Vitrales, Apodaca',
    tel_principal: 8122942626,
    tel_secundario: 8124287896,
    correo: 'edson@gmail.com',
    fecha_reg: new Date(),
  },
];


@Component({
  selector: 'pacients-component',
  templateUrl: './pacients.component.html',
  styleUrls: [
    './pacients-header.component.scss',
    './pacients-top-table.component.scss',
    './pacients-table.component.scss',
    './pacients.component.scss',
  ],
})
export class PacientsComponent {
  displayedColumns: string[] = ['ID', 'Nombre', 'Fecha_nac', 'Sexo', "Domicilio", "Tel_principal", "Correo", "Fecha_reg", "Acciones"];
  dataSource = PACIENTS_DATA;

  formatDate(date:Date) {
      return date.getDate() + "." + date.getMonth() + "." + date.getFullYear()
  }
}
