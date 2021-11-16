import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hora } from "../../hora/hora.model";
import { Area } from 'src/app/area/area.model';
import { AreaService } from 'src/app/area/area.service';
import { Doctor } from 'src/app/doctors/doctor.model';
import { DoctorService } from 'src/app/doctors/doctor.service';
import { HoraService } from 'src/app/hora/hora.service';
import { Paciente } from 'src/app/pacients/paciente.model';
import { PacienteService } from 'src/app/pacients/paciente.service';
import { Cita } from '../cita.model';
import { CitaService } from '../cita.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'citas-modal',
  templateUrl: './citas-modal.component.html',
  styleUrls: ['./citas-modal.component.scss'],
})
export class CitasModal implements OnInit {
  constructor(private citaService: CitaService, private router: Router, private areaService: AreaService, private doctorService: DoctorService, private pacienteService: PacienteService, private horaService: HoraService) {}
  @Output() onClose = new EventEmitter<boolean>();

  setClose() {
    this.onClose.emit(false);
  }

  newCitaForm = new FormGroup({
    area: new FormControl("", [Validators.required]),
    nombre_doctor: new FormControl("", [Validators.required]),
    nombre_paciente: new FormControl("", [Validators.required]),
    fecha: new FormControl("", [Validators.required]),
    hora: new FormControl("", [Validators.required])
  });

  // Datepicker
  nowDate = new Date();
  minDate = new Date(this.nowDate.getFullYear(), this.nowDate.getUTCMonth(),this.nowDate.getUTCDate() );
  maxDate = new Date(this.nowDate.getFullYear() + 1, 11, 31);
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return true;
  };

  areas: String[] = [];
  areasDb: Area[] = [];
  doctores: String[] = [];
  doctoresDb:  Doctor[] = [];
  pacientes: String[] = [];
  pacientesDb: Paciente[] = [];
  horas: String[] = [];
  horasDb: Hora[] = [];
  horarioDb: Object[] = [];

  // Global id
  idArea!: Number | undefined;
  idDoctor!: Number | undefined;
  idPaciente!: Number | undefined;
  idHora!: Number | undefined;

  async ngOnInit() {
    // Disable fields
    this.newCitaForm.controls['nombre_doctor'].disable();
    this.newCitaForm.controls['nombre_paciente'].disable();
    this.newCitaForm.controls['fecha'].disable();
    this.newCitaForm.controls['hora'].disable();

    //Get areas
    const areasDb: any = await this.areaService.getAreasObservable().toPromise();
    this.areasDb = areasDb.data;
    areasDb.data.forEach((area: any) => {
      this.areas = [...this.areas, area.nombre]
    });

    // Get pacientes
    const pacientesDb: any = await this.pacienteService.getPacientesObservable().toPromise();
    this.pacientesDb = pacientesDb.data;
    this.pacientesDb.forEach((paciente) => {
      this.pacientes = [...this.pacientes, paciente.nombres +  " " + paciente.apellidos + " (id:" + paciente.id_paciente + ")"];
    })
  }

  async unlockDoctor() {
    // Get doctors in area
    const selectedArea = this.newCitaForm.value['area'];
    const doctoresDb: any = await this.doctorService.getDoctoresObservable().toPromise();
    this.doctoresDb = doctoresDb.data;
    const id_area = this.areasDb.find((area) => area.nombre == selectedArea)?.id_area;
    this.idArea = id_area;
    const areaDoctors =  doctoresDb.data.filter((doctor: any) => doctor.id_area == id_area);
    if(areaDoctors.length != 0) {
      this.doctores = [];
      areaDoctors.forEach((doctor: any) => {
        this.doctores = [...this.doctores, doctor.nombre];
      })
      this.newCitaForm.controls['nombre_doctor'].enable();
    } else {
      this.doctores = [];
      this.newCitaForm.controls['nombre_doctor'].disable();
    }

    
  }

  async unlockPacient() {
    this.newCitaForm.controls['nombre_paciente'].enable()

    // Get doctors horario
    const nombreDoctor = this.newCitaForm.value['nombre_doctor'];
    const doctorIdSearch = this.doctoresDb.find((doctor) => doctor.nombre == nombreDoctor);
    this.idDoctor = doctorIdSearch?.id_doctor;
    const horarioDb = await this.doctorService.getHorarioDoctorObservable(doctorIdSearch?.id_doctor).toPromise();
    const horarioArray: any = horarioDb.data;
    const horarioArrayOnly = horarioArray[0];
    this.horarioDb = horarioArrayOnly;
    let diasDoctor: any = [];
    horarioArrayOnly.forEach((hora: any) => {
      diasDoctor.push(hora.id_dia);
    });
    const diasDoctorUnique = [...new Set(diasDoctor)];

    this.myFilter = (d: Date | null): boolean => {
      const day = (d || new Date()).getDay();
      // Prevent Saturday and Sunday from being selected.
      const boolArray: any = [] ;
      diasDoctorUnique.forEach((dia) => {
        boolArray.push(dia !== day);
      })
      return /false/i.test(boolArray.join(''));;
    };
  }

  unlockFecha() {
    const nombrePaciente = this.newCitaForm.value['nombre_paciente'];
    const sp = nombrePaciente.split(":");
    const spNumber = parseInt(sp[sp.length - 1].split(")")[0]);
    this.idPaciente = spNumber;
    this.newCitaForm.controls['fecha'].enable();
  }

  async unlockHora() {
     this.newCitaForm.controls['hora'].enable();
     const pickedDate:Date = this.newCitaForm.value['fecha'];
     const pickedDay = pickedDate.getUTCDay();
     const horasDay = this.horarioDb.filter((horario: any) => horario.id_dia == pickedDay);
     let horas: any = [];
     horasDay.forEach((hora: any) => {
       horas.push(hora.id_hora)
     });
     const horasUnique = [...new Set(horas)];
     const horasString: any = [];
     
     const horasDbActual = await this.horaService.getHoras().toPromise();
     const horasArrayOnly = horasDbActual.horas;
     this.horasDb = horasArrayOnly;
     horasUnique.forEach((horaUnique) => {
       horasString.push(horasArrayOnly.find((hora) => hora.id_hora == horaUnique)?.hora_inicial);
     });
     this.horas = horasString;
  }

  asignarHoraId(event: any) {
    this.idHora = event.target.selectedIndex + 1;
  }

  onSubmit() {
    var newCitaData: Cita = {
      id_cita: 0,
      fecha: this.newCitaForm.value['fecha'],
      id_doctor:  Number(this.idDoctor),
      id_hora: Number(this.idHora),
      id_paciente: Number(this.idPaciente)
    };

    this.citaService.addCita(newCitaData);
  }
}
