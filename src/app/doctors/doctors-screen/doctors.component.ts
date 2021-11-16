import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Doctor } from "../doctor.model";
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'doctors-component',
  templateUrl: './doctors.component.html',
  styleUrls: [
    './doctors.component.scss',
    './doctors-1920/doctors-header.component.scss',
    './doctors-1920/doctors-table.component.scss',
    "./doctors-1366/doctors-header.component.scss",
    "./doctors-1366/doctors-table.component.scss"
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
export class DoctorsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // Modal
  showModal = false;
  showAreaModal = false;
  showDeleteModal = false;
  showEditModal = false;
  actualDeleteId = -1;
  actualEditDoctor: any = null;

  closeAreaModal(value: boolean) {
    this.showAreaModal = value;
  }

  closeEditModal(value: boolean) {
    this.showEditModal = value;
  }

  closeModal(value: boolean) {
    this.showModal = value;
  }

  closeDeleteModal(value: boolean) {
    this.showDeleteModal = value;
  }

  // doctor Service
  doctores: Doctor[] = [];
  doctoresFiltered: Doctor[] = this.doctores;
  doctoresPaginator = new MatTableDataSource<Doctor>([]);

  private doctoresSubscription!: Subscription;
  displayedColumns: string[] = [
    'ID',
    'NombreDoctor',
    'Cedula',
    'Telefono',
    'Correo',
    'Fecha_reg',
    'Acciones',
  ];

  constructor(public doctorService: DoctorService) {}

  ngOnInit() {
    this.doctorService.getDoctores();
    this.doctoresSubscription = this.doctorService
      .getDoctoresListener()
      .subscribe((doctoresData: { doctores: Doctor[] }) => {
        this.doctores = doctoresData.doctores;
        this.doctoresFiltered = doctoresData.doctores;
        this.doctoresPaginator = new MatTableDataSource<Doctor>(
          doctoresData.doctores
        );
        this.doctoresPaginator.paginator = this.paginator;
        console.log(this.doctores);
      });
  }

  formatDate(date: Date) {
    date = new Date(date);
    return (
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    );
  }

  deleteDoctor(id_doctor: Number) {
    const deleteObservable = this.doctorService.deleteDoctor(id_doctor);
    deleteObservable.subscribe((responseData: any) => {
      this.doctores = this.doctores.filter(
        (doctor) => doctor.id_doctor != id_doctor
      );
      this.doctoresFiltered = this.doctores.filter(
        (doctor) => doctor.id_doctor != id_doctor
      );
      this.doctoresPaginator = new MatTableDataSource<Doctor>(
        this.doctores
      );
      this.doctoresPaginator.paginator = this.paginator;
      this.showDeleteModal = false;
    });
  }

  searchDoctor(searchValue: any) {
    if (searchValue == '') {
      this.doctoresFiltered = this.doctores;
    } else {
      this.doctoresFiltered = this.doctores.filter(
        (doctor) =>
          doctor.nombre.includes(searchValue.target.value)
      );
    }
    this.doctoresPaginator = new MatTableDataSource<Doctor>(
      this.doctoresFiltered
    );
    this.doctoresPaginator.paginator = this.paginator;
  }

  // Filters
  filterNameAscending() {
    this.doctoresFiltered = [
      ...this.doctoresFiltered.sort((a, b) => {
        if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
          return -1;
        }
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
          return 1;
        }
        return 0;
      }),
    ];
    // Update paginator
    this.doctoresPaginator = new MatTableDataSource<Doctor>(
      this.doctoresFiltered
    );
    this.doctoresPaginator.paginator = this.paginator;
  }

  filterNameDescending() {
    this.doctoresFiltered = [
      ...this.doctoresFiltered.sort((a, b) => {
        if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
          return 1;
        }
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
          return -1;
        }
        return 0;
      }),
    ];
    // Update paginator
    this.doctoresPaginator = new MatTableDataSource<Doctor>(
      this.doctoresFiltered
    );
    this.doctoresPaginator.paginator = this.paginator;
  }

  filterName(option: any) {
    // 'Nombre ascendente \u2191', 'Nombre descendente \u2193','Apellido ascendente \u2191', 'Apellido descendente \u2193'
    if (option.value == 'Nombre ascendente \u2191') {
      this.filterNameAscending();
    } else {
      this.filterNameDescending();
    }
  }


  filterDateAscending() {
    this.doctoresFiltered = [
      ...this.doctoresFiltered.sort((a, b) => {
        const primero = new Date(a.fecha_reg).getTime();
        const segundo = new Date(b.fecha_reg).getTime();
        return primero > segundo ? 1 : -1;
      }),
    ];
    // Update paginator
    this.doctoresPaginator = new MatTableDataSource<Doctor>(
      this.doctoresFiltered
    );
    this.doctoresPaginator.paginator = this.paginator;
  }

  filterDateDescending() {
    this.doctoresFiltered = [
      ...this.doctoresFiltered.sort((a, b) => {
        const primero = new Date(a.fecha_reg).getTime();
        const segundo = new Date(b.fecha_reg).getTime();
        return primero > segundo ? -1 : 1;
      }),
    ];
    // Update paginator
    this.doctoresPaginator = new MatTableDataSource<Doctor>(
      this.doctoresFiltered
    );
    this.doctoresPaginator.paginator = this.paginator;
  }

  filterDate(option: any) {
    if (option.value == 'Mas reciente \u2191') {
      this.filterDateAscending();
    } else {
      this.filterDateDescending();
    }
  }
}
