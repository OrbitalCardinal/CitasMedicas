import { Component, OnInit, ViewChild } from '@angular/core';
import { Cita } from '../cita.model';
import { CitaService } from '../cita.service';
import { Subscription } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AreaService } from 'src/app/area/area.service';
import { DoctorService } from 'src/app/doctors/doctor.service';
import { PacienteService } from 'src/app/pacients/paciente.service';
import { HoraService } from 'src/app/hora/hora.service';

interface CitaDecomposed {
  id_cita: Number;
  nombre_doctor: String;
  nombre_paciente: String;
  area: String;
  fecha: Date;
  hora: string;
}

@Component({
  selector: 'citas-component',
  templateUrl: './citas.component.html',
  styleUrls: [
    './citas-1366/citas-header.component.scss',
    './citas-1366/citas-table.component.scss',
    './citas-1920/citas-header.component.scss',
    './citas-1920/citas-table.component.scss',
    './citas.component.scss',
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
export class CitasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // Modal
  showModal = false;
  showDeleteModal = false;
  showEditModal = false;
  actualDeleteId = -1;
  actualEditCita: any = null;

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
  citas: Cita[] = [];
  citasPaginator = new MatTableDataSource<CitaDecomposed>([]);
  citasDecomposed: CitaDecomposed[] = [];
  citasFiltered: CitaDecomposed[] = this.citasDecomposed;

  private citasSubscription!: Subscription;
  displayedColumns: string[] = [
    'ID',
    'NombreDoctor',
    'NombrePaciente',
    'Area',
    'Fecha',
    'Hora',
    'Acciones',
  ];

  constructor(
    public citaService: CitaService,
    private areaService: AreaService,
    private doctorService: DoctorService,
    private pacienteService: PacienteService,
    private horaService: HoraService
  ) {}

  async ngOnInit() {
    // Obtener citas
    this.citaService.getCitas();
    this.citasSubscription = this.citaService
      .getCitasListener()
      .subscribe((citasData: { citas: Cita[] }) => {
        this.citas = citasData.citas;
        console.log(this.citas);
        // Descomponer citas

        this.citas.forEach(async (cita) => {
          const paciente: any = await this.pacienteService
            .getPacienteById(cita.id_paciente)
            .toPromise();
          const nombresPaciente = paciente.nombres;
          const apellidosPaciente = paciente.apellidos;
          const nombreCompletoPaciente =
            nombresPaciente + ' ' + apellidosPaciente;

          const doctor: any = await this.doctorService
            .getDoctorById(cita.id_doctor)
            .toPromise();
          const nombreDoctor = doctor.nombre;
          const id_area = doctor.id_area;

          const area: any = await this.areaService
            .getAreaById(id_area)
            .toPromise();
          const areaNombre = area.nombre;

          const hora: any = await this.horaService
            .getHoraById(cita.id_hora)
            .toPromise();
          const horaString = hora.hora_inicial;

          const citaDec: CitaDecomposed = {
            id_cita: cita.id_cita,
            nombre_doctor: nombreDoctor,
            nombre_paciente: nombreCompletoPaciente,
            area: areaNombre,
            fecha: cita.fecha,
            hora: horaString,
          };

          this.citasDecomposed = [...this.citasDecomposed, citaDec];

          // Paginator assingment
          this.citasFiltered = this.citasDecomposed;
          this.citasPaginator = new MatTableDataSource<CitaDecomposed>(this.citasDecomposed);
          this.citasPaginator.paginator = this.paginator;
        });
      });
  }

  formatDate(date: Date) {
    date = new Date(date);
    return (
      date.getDate() +
      2 +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear()
    );
  }

  deleteCita(id_cita: Number) {
    const deleteObservable = this.citaService.deleteCita(id_cita);
    deleteObservable.subscribe((responseData) => {
      this.citasDecomposed = this.citasDecomposed.filter(
        (cita) => cita.id_cita!= id_cita
      );
      this.citasFiltered = this.citasDecomposed.filter(
        (cita) => cita.id_cita != id_cita
      );
      this.citasPaginator = new MatTableDataSource<CitaDecomposed>(
        this.citasDecomposed
      );
      this.citasPaginator.paginator = this.paginator;
      this.showDeleteModal = false;
    });
  }

    searchCita(searchValue: any) {
      if (searchValue == '') {
        this.citasFiltered = this.citasDecomposed;
      } else {
        this.citasFiltered = this.citasDecomposed.filter(
          (cita) =>
            cita.nombre_paciente.includes(searchValue.target.value) ||
            cita.nombre_doctor.includes(searchValue.target.value)
        );
      }
      this.citasPaginator = new MatTableDataSource<CitaDecomposed>(
        this.citasFiltered
      );
      this.citasPaginator.paginator = this.paginator;
    }

 

    filterDateAscending() {
      this.citasFiltered = [...this.citasFiltered.sort((a,b) => {
        const primero = new Date(a.fecha).getTime();
        const segundo = new Date(b.fecha).getTime();
        return primero > segundo ? 1 : -1;
      } )];
      // Update paginator
      this.citasPaginator = new MatTableDataSource<CitaDecomposed>(
        this.citasFiltered
      );
      this.citasPaginator.paginator = this.paginator;
    }

    filterDateDescending() {
      this.citasFiltered = [...this.citasFiltered.sort((a,b) => {
        const primero = new Date(a.fecha).getTime();
        const segundo = new Date(b.fecha).getTime();
        return primero > segundo ? -1 : 1;
      } )];
      // Update paginator
      this.citasPaginator = new MatTableDataSource<CitaDecomposed>(
        this.citasFiltered
      );
      this.citasPaginator.paginator = this.paginator;
    }

    filterDate(option: any) {
      if(option.value == "Mas reciente \u2191") {
        this.filterDateAscending();
      } else {
        this.filterDateDescending();
      }
    }
}
