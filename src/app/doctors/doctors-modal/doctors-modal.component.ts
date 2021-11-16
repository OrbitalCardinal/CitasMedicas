import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/area/area.model';
import { AreaService } from 'src/app/area/area.service';
import { Doctor } from '../doctor.model';
import { DoctorService } from '../doctor.service';
import { HoraService } from "../../hora/hora.service";
import { Hora } from "../../hora/hora.model";

@Component({
  selector: 'doctors-modal',
  templateUrl: './doctors-modal.component.html',
  styleUrls: ['./doctors-modal.component.scss'],
})
export class DoctorsModal implements OnInit {
  constructor(private horaService: HoraService, private doctorService: DoctorService, private areaService: AreaService, private router: Router) {}
  @Output() onClose = new EventEmitter<boolean>();

  daysSet = {
    "Lunes": 0,
    "Martes": 0,
    "Miercoles":0,
    "Jueves": 0,
    "Viernes": 0,
  }
  daysArraySet = [
    {...this.daysSet}
  ]

  addDaySet() {
    this.daysArraySet.push({...this.daysSet});
  }

  returnKeys(obj: any) {
    return Object.keys(obj);
  }

  returnDayValue(day: any, daySet: Object) {
    return  Object.values(daySet)[Object.keys(daySet).indexOf(day)];
  }

  changeDayValue(index: any, day: any, value: any) {
    const valueChange = [1,0];
    if(day == "Lunes") { this.daysArraySet[index].Lunes = valueChange[value]}
    if(day == "Martes") { this.daysArraySet[index].Martes = valueChange[value]}
    if(day == "Miercoles") { this.daysArraySet[index].Miercoles = valueChange[value]}
    if(day == "Jueves") { this.daysArraySet[index].Jueves = valueChange[value]}
    if(day == "Viernes") { this.daysArraySet[index].Viernes = valueChange[value]}
    
  }

  returnEntries(array: any) {
    return array.entries();
  }

  doctorFormGroup = new FormGroup({
    nombres: new FormControl("", [Validators.required]),
    apellidos: new FormControl("", [Validators.required]),
    correo: new FormControl("", [Validators.required, Validators.email]),
    telefono: new FormControl("", [Validators.required]),
    area: new FormControl("", [Validators.required]),
    cedula: new FormControl("",[Validators.required]),
    hora_inicial: new FormControl("",[Validators.required]),
    hora_final: new FormControl("", [Validators.required])

  });

  areas: Area[] = [];
  areasSubscription!: Subscription;
  horas: Hora[] = [];

  setClose() {
    this.onClose.emit(false);
  }

  ngOnInit() {
    this.areaService.getAreas();
    this.areasSubscription = this.areaService
      .getAreasListener()
      .subscribe((areasData: { areas: Area[] }) => {
        this.areas = areasData.areas;
        this.doctorFormGroup.controls['area'].setValue(this.areas[0].nombre);

        this.horaService.getHoras().subscribe((horas: any) => {
          this.horas = horas.horas;
          this.doctorFormGroup.controls['hora_inicial'].setValue(this.horas[0].hora_inicial);
          this.doctorFormGroup.controls['hora_final'].setValue(this.horas[0].hora_final);
        })
      });
  }

  onSubmit() {
    const daysActive = this.daysArraySet[0];
    const daysActiveTransformed = [];
    for(let [index, day] of Object.keys(daysActive).entries()) {
      if(Object.values(daysActive)[index] == 1) {
        daysActiveTransformed.push(index + 1);
      }
    }
    const hora_inicial = this.doctorFormGroup.value['hora_inicial']
    const hora_final = this.doctorFormGroup.value['hora_final'];
    const index_inicial: any = this.horas.find((hora) => hora.hora_inicial == hora_inicial)?.id_hora;
    const index_final: any = this.horas.find((hora) => hora.hora_final == hora_final)?.id_hora;
    let rangoHoras: any = [];
    for(var i = index_inicial!; i <= index_final!; i++) {
      rangoHoras.push(i);
    }

    let horario:any = {};
    daysActiveTransformed.forEach((day) => {
      horario[day] = rangoHoras;
    });

    const nombreArea = this.doctorFormGroup.value['area'];
    const id_area =  this.areas.find((area) => area.nombre == nombreArea)?.id_area;

    const newDoctor = {
      nombre: this.doctorFormGroup.value['nombres'] + " " + this.doctorFormGroup.value['apellidos'],
      cedula: this.doctorFormGroup.value['cedula'],
      telefono: this.doctorFormGroup.value['telefono'],
      correo: this.doctorFormGroup.value['correo'],
      fecha_reg: new Date(),
      id_area: id_area,
      horario: horario
    }
    
    this.doctorService.addDoctor(newDoctor);
  }

}
