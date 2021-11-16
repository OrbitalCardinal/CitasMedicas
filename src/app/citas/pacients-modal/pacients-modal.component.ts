import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from '../paciente.model';
import { PacienteService } from '../paciente.service';

@Component({
  selector: 'pacients-modal',
  templateUrl: './pacients-modal.component.html',
  styleUrls: ['./pacients-modal.component.scss'],
})
export class PacientsModal {
  constructor(private pacienteService: PacienteService, private router: Router) {}
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
    nombres: new FormControl('', [Validators.required]),
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
      (this.meses.indexOf(this.newPacienteForm.value['mes_nac']) + 1) +
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
      id_paciente: 0,
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

    this.pacienteService.addPaciente(newPacienteData);
  }
}
