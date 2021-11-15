import { Component, OnInit, ViewChild } from '@angular/core';
import { Paciente } from '../paciente.model';
import { PacienteService } from '../paciente.service';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'pacients-component',
  templateUrl: './pacients.component.html',
  styleUrls: [
    './pacients-1366/pacients-header.component.scss',
    './pacients-1366/pacients-table.component.scss',
    './pacients-1920/pacients-header.component.scss',
    './pacients-1920/pacients-table.component.scss',
    './pacients.component.scss',
  ],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(250, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(250, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class PacientsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // Modal
  showModal = false;
  showDeleteModal = false;
  showEditModal = false;
  actualDeleteId = -1;
  actualEditPaciente: any = null;

  closeEditModal(value: boolean) {
    this.showEditModal = value;
  }

  closeModal(value: boolean) {
    this.showModal = value;
  }

  closeDeleteModal(value: boolean) {
    this.showDeleteModal = value;
  }

  // Paciente Service
  pacientes: Paciente[] = [];
  pacientesFiltered: Paciente[] = this.pacientes;
  pacientesPaginator = new MatTableDataSource<Paciente>([]);

  private pacientesSubscription!: Subscription;
  displayedColumns: string[] = [
    'ID',
    'Nombre',
    'Fecha_nac',
    'Sexo',
    'Domicilio',
    'Tel_principal',
    'Correo',
    'Fecha_reg',
    'Acciones',
  ];

  constructor(public pacienteServices: PacienteService) {}

  ngOnInit() {
    this.pacienteServices.getPacientes();
    this.pacientesSubscription = this.pacienteServices
      .getPacientesListener()
      .subscribe((pacientesData: { pacientes: Paciente[] }) => {
        this.pacientes = pacientesData.pacientes;
        this.pacientesFiltered = pacientesData.pacientes;
        this.pacientesPaginator = new MatTableDataSource<Paciente>(
          pacientesData.pacientes
        );
        this.pacientesPaginator.paginator = this.paginator;
        console.log(this.pacientes);
      });
  }

  formatDate(date: Date) {
    date = new Date(date);
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }

  deletePaciente(id_paciente: Number) {
    const deleteObservable = this.pacienteServices.deletePaciente(id_paciente);
    deleteObservable.subscribe((responseData) => {
      this.pacientes = this.pacientes.filter(
        (paciente) => paciente.id_paciente != id_paciente
      );
      this.pacientesFiltered = this.pacientes.filter(
        (paciente) => paciente.id_paciente != id_paciente
      );
      this.pacientesPaginator = new MatTableDataSource<Paciente>(
        this.pacientes
      );
      this.pacientesPaginator.paginator = this.paginator;
      this.showDeleteModal = false;
    });
  }

  searchPaciente(searchValue: any) {
    if (searchValue == '') {
      this.pacientesFiltered = this.pacientes;
    } else {
      this.pacientesFiltered = this.pacientes.filter(
        (paciente) =>
          paciente.nombres.includes(searchValue.target.value) ||
          paciente.apellidos.includes(searchValue.target.value)
      );
    }
    this.pacientesPaginator = new MatTableDataSource<Paciente>(
      this.pacientesFiltered
    );
    this.pacientesPaginator.paginator = this.paginator;
  }

  // Filters
  filterNameAscending() {
    this.pacientesFiltered =  [...this.pacientesFiltered.sort((a, b) => {
      if (a.nombres.toLowerCase() < b.nombres.toLowerCase()) {
        return -1;
      }
      if (a.nombres.toLowerCase() > b.nombres.toLowerCase()) {
        return 1;
      }
      return 0;
    })];
    // Update paginator
    this.pacientesPaginator = new MatTableDataSource<Paciente>(
      this.pacientesFiltered
    );
    this.pacientesPaginator.paginator = this.paginator;
  }

  filterNameDescending() {
    this.pacientesFiltered = [...this.pacientesFiltered.sort((a, b) => {
      if (a.nombres.toLowerCase() < b.nombres.toLowerCase()) {
        return 1;
      }
      if (a.nombres.toLowerCase() > b.nombres.toLowerCase()) {
        return -1;
      }
      return 0;
    })];
    // Update paginator
    this.pacientesPaginator = new MatTableDataSource<Paciente>(
      this.pacientesFiltered
    );
    this.pacientesPaginator.paginator = this.paginator;
  }

  filterLastNameAscending() {
    this.pacientesFiltered =  [...this.pacientesFiltered.sort((a, b) => {
      if (a.apellidos.toLowerCase() < b.apellidos.toLowerCase()) {
        return -1;
      }
      if (a.apellidos.toLowerCase() > b.apellidos.toLowerCase()) {
        return 1;
      }
      return 0;
    })];
    // Update paginator
    this.pacientesPaginator = new MatTableDataSource<Paciente>(
      this.pacientesFiltered
    );
    this.pacientesPaginator.paginator = this.paginator;
  }

  filterLastNameDescending() {
    this.pacientesFiltered = [...this.pacientesFiltered.sort((a, b) => {
      if (a.apellidos.toLowerCase() < b.apellidos.toLowerCase()) {
        return 1;
      }
      if (a.apellidos.toLowerCase() > b.apellidos.toLowerCase()) {
        return -1;
      }
      return 0;
    })];
    // Update paginator
    this.pacientesPaginator = new MatTableDataSource<Paciente>(
      this.pacientesFiltered
    );
    this.pacientesPaginator.paginator = this.paginator;
  }

  filterNameLastName(option: any) {
    // 'Nombre ascendente \u2191', 'Nombre descendente \u2193','Apellido ascendente \u2191', 'Apellido descendente \u2193'
    if (option.value == 'Nombre ascendente \u2191') {
      this.filterNameAscending();
    } else if (option.value == 'Nombre descendente \u2193') {
      this.filterNameDescending();
    } else if (option.value == 'Apellido ascendente \u2191') {
      this.filterLastNameAscending();
    } else if (option.value == 'Apellido descendente \u2193') {
      this.filterLastNameDescending();
    }
  }

  filterSex(sex: any) {
    this.pacientesFiltered = this.pacientes.filter(
      (paciente) => paciente.sexo == sex.value.split(' ')[0]
    );
    // Update paginator
    this.pacientesPaginator = new MatTableDataSource<Paciente>(
      this.pacientesFiltered
    );
    this.pacientesPaginator.paginator = this.paginator;
  }

  filterAddressAscending() {
    this.pacientesFiltered = [...this.pacientesFiltered.sort((a, b) => {
      if (a.domicilio.toLowerCase() < b.domicilio.toLowerCase()) {
        return -1;
      }
      if (a.domicilio.toLowerCase() > b.domicilio.toLowerCase()) {
        return 1;
      }
      return 0;
    })];
    // Update paginator
    this.pacientesPaginator = new MatTableDataSource<Paciente>(
      this.pacientesFiltered
    );
    this.pacientesPaginator.paginator = this.paginator;
  }

  filterAddressDescending() {
    this.pacientesFiltered = [...this.pacientesFiltered.sort((a, b) => {
      if (a.domicilio.toLowerCase() < b.domicilio.toLowerCase()) {
        return 1;
      }
      if (a.domicilio.toLowerCase() > b.domicilio.toLowerCase()) {
        return -1;
      }
      return 0;
    })];
    // Update paginator
    this.pacientesPaginator = new MatTableDataSource<Paciente>(
      this.pacientesFiltered
    );
    this.pacientesPaginator.paginator = this.paginator;
  }

  filterAddress(option: any) {
    if (option.value == 'Ascendente \u2191') {
      this.filterAddressAscending();
    } else if (option.value == 'Descendente \u2193') {
      this.filterAddressDescending();
    }
  }

  filterDateAscending() {
    this.pacientesFiltered = [...this.pacientesFiltered.sort((a,b) => {
      const primero = new Date(a.fecha_nac).getTime(); 
      const segundo = new Date(b.fecha_nac).getTime();
      return primero > segundo ? 1 : -1;
    } )];
    // Update paginator
    this.pacientesPaginator = new MatTableDataSource<Paciente>(
      this.pacientesFiltered
    );
    this.pacientesPaginator.paginator = this.paginator;
  }

  filterDateDescending() {
    this.pacientesFiltered = [...this.pacientesFiltered.sort((a,b) => {
      const primero = new Date(a.fecha_nac).getTime(); 
      const segundo = new Date(b.fecha_nac).getTime();
      return primero > segundo ? -1 : 1;
    } )];
    // Update paginator
    this.pacientesPaginator = new MatTableDataSource<Paciente>(
      this.pacientesFiltered
    );
    this.pacientesPaginator.paginator = this.paginator;
  }

  filterDate(option: any) {
    if(option.value == "Mas reciente \u2191") {
      this.filterDateAscending();
    } else {
      this.filterDateDescending();
    }
  }
}
