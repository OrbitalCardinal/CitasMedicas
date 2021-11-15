import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from '../paciente.model';
import { PacienteService } from '../paciente.service';

@Component({
  selector: 'pacients-edit-modal',
  templateUrl: './pacients-edit-modal.component.html',
  styleUrls: ['./pacients-edit-modal.component.scss'],
})
export class PacientsEditModal implements OnInit {
  constructor(
    private pacienteService: PacienteService,
    private router: Router
  ) {}

  @Input() actualEditPaciente!: Paciente;
  @Output() onClose = new EventEmitter<boolean>();
  meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  dias = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  estados = [
    'Aguascalientes',
    'Baja California',
    'Baja California Sur',
    'Campeche',
    'Chiapas',
    'Chihuahua',
    'Ciudad de México',
    'Coahuila',
    'Colima',
    'Durango',
    'Estado de México',
    'Guanajuato',
    'Guerrero',
    'Hidalgo',
    'Jalisco',
    'Michoacán',
    'Morelos',
    'Nayarit',
    'Nuevo León',
    'Oaxaca',
    'Puebla',
    'Querétaro',
    'Quintana Roo',
    'San Luis Potosí',
    'Sinaloa',
    'Sonora',
    'Tabasco',
    'Tamaulipas',
    'Tlaxcala',
    'Veracruz',
    'Yucatán',
    'Zacatecas',
  ];
  filteredDias = this.dias;

  newPacienteForm = new FormGroup({
    nombres: new FormControl('', [
      Validators.required,
    ]),
    apellidos: new FormControl('', [Validators.required]),
    dia_nac: new FormControl('', [Validators.required]),
    mes_nac: new FormControl('', [Validators.required]),
    year_nac: new FormControl('', [
      Validators.required,
      Validators.min(1900),
      Validators.max(new Date().getFullYear()),
    ]),
    sexo: new FormControl('', [Validators.required]),
    calle: new FormControl('', [Validators.required]),
    num_ext: new FormControl('', [Validators.required]),
    num_int: new FormControl('', []),
    colonia: new FormControl('', [Validators.required]),
    municipio: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    codigoPostal: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    tel_princ: new FormControl('', [Validators.required]),
    tel_sec: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    const fecha_nac = new Date(this.actualEditPaciente.fecha_nac)
    this.newPacienteForm.controls["nombres"].setValue(this.actualEditPaciente.nombres);
    this.newPacienteForm.controls["apellidos"].setValue(this.actualEditPaciente.apellidos);
    this.newPacienteForm.controls["dia_nac"].setValue(fecha_nac.getDate());
    this.newPacienteForm.controls["mes_nac"].setValue(this.meses[fecha_nac.getMonth()]);
    this.newPacienteForm.controls["year_nac"].setValue(fecha_nac.getFullYear());
    this.newPacienteForm.controls["sexo"].setValue(this.actualEditPaciente.sexo);
    // 
    const splitAddress = this.actualEditPaciente.domicilio.split(",")
    const calle = splitAddress[0];
    const num_ext = splitAddress[1];
    const num_int = splitAddress[2] == undefined ? "": splitAddress[2];
    const colonia = splitAddress[3];
    const municipio = splitAddress[4];
    const estado = splitAddress[5];
    const cp = splitAddress[6];
    //
    this.newPacienteForm.controls["calle"].setValue(calle);
    this.newPacienteForm.controls["num_ext"].setValue(num_ext);
    this.newPacienteForm.controls["num_int"].setValue(num_int);
    this.newPacienteForm.controls["colonia"].setValue(colonia);
    this.newPacienteForm.controls["municipio"].setValue(municipio);
    this.newPacienteForm.controls["estado"].setValue(estado);
    this.newPacienteForm.controls["codigoPostal"].setValue(cp);
    this.newPacienteForm.controls["correo"].setValue(this.actualEditPaciente.correo);
    this.newPacienteForm.controls["tel_princ"].setValue(this.actualEditPaciente.tel_principal);
    this.newPacienteForm.controls["tel_sec"].setValue(this.actualEditPaciente.tel_secundario);

  }


  setClose() {
    this.onClose.emit(false);
  }

  filterMonthsDay(event: any) {
    const monthIndex = this.meses.indexOf(event.target.value) + 1;
    if (monthIndex % 2 == 0) {
      if (monthIndex == 2) {
        this.filteredDias = this.dias.slice(0, this.dias.length - 2);
      } else {
        this.filteredDias = this.dias.slice(0, this.dias.length - 1);
      }
    } else {
      this.filteredDias = this.dias;
    }
  }

  onSubmit() {
    const fecha_nac =
      this.meses.indexOf(this.newPacienteForm.value['mes_nac']) +
      1 +
      '/' +
      this.newPacienteForm.value['dia_nac'] +
      '/' +
      this.newPacienteForm.value['year_nac'];
    const fecha_nac_date = new Date(fecha_nac);
    console.log(fecha_nac_date);
    const domicilio =
      this.newPacienteForm.value['calle'] +
      ',' +
      this.newPacienteForm.value['num_ext'] +
      ',' +
      this.newPacienteForm.value['num_int'] +
      ',' +
      this.newPacienteForm.value['colonia'] +
      ',' +
      this.newPacienteForm.value['municipio'] +
      ',' +
      this.newPacienteForm.value['estado'] +
      ',' +
      this.newPacienteForm.value['codigoPostal'];

    var newPacienteData: Paciente = {
      id_paciente: this.actualEditPaciente.id_paciente,
      nombres: this.newPacienteForm.value['nombres'],
      apellidos: this.newPacienteForm.value['apellidos'],
      fecha_nac: fecha_nac_date,
      sexo: this.newPacienteForm.value['sexo'],
      domicilio: domicilio,
      tel_principal: this.newPacienteForm.value['tel_princ'],
      tel_secundario: this.newPacienteForm.value['tel_sec'],
      correo: this.newPacienteForm.value['correo'],
      fecha_reg: new Date(),
    };

    this.pacienteService.updatePaciente(newPacienteData);
  }
}
