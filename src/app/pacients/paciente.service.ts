import { Paciente } from './paciente.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const BACKEND_URL = 'http://localhost:3000/pacients';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private pacientes: Paciente[] = [];
  private pacientesObservable = new Subject<{ pacientes: Paciente[] }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPacienteById(id: Number) {
    return this.http.get<{message: String, data: Paciente}>(BACKEND_URL + "?id=" + id).pipe(map((pacienteData) => {
      return {
        id_paciente: pacienteData.data.id_paciente,
        nombres: pacienteData.data.nombres,
        apellidos: pacienteData.data.apellidos,
        fecha_nac: pacienteData.data.fecha_nac,
        sexo: pacienteData.data.sexo,
        domicilio: pacienteData.data.domicilio,
        tel_principal: pacienteData.data.tel_principal,
        tel_secundario: pacienteData.data.tel_secundario,
        correo: pacienteData.data.correo,
        fecha_reg: pacienteData.data.fecha_reg
      }
    }));
  }
  
  getPacientesObservable() {
    return this.http.get<{message: String, data: Paciente[]}>(BACKEND_URL);
  }

  getPacientes() {
    this.http
      .get<{ message: String; data: Paciente[] }>(BACKEND_URL)
      .pipe(
        map((pacientesData) => {
          return {
            pacientes: pacientesData.data.map((paciente) => {
              return {
                id_paciente: paciente.id_paciente,
                nombres: paciente.nombres,
                apellidos: paciente.apellidos,
                fecha_nac: paciente.fecha_nac,
                sexo: paciente.sexo,
                domicilio: paciente.domicilio,
                tel_principal: paciente.tel_principal,
                tel_secundario: paciente.tel_secundario,
                correo: paciente.correo,
                fecha_reg: paciente.fecha_reg,
              };
            }),
          };
        })
      )
      .subscribe((transformedPacientes) => {
        this.pacientes = transformedPacientes.pacientes;
        this.pacientesObservable.next({ pacientes: [...this.pacientes] });
      });
  }

  getPacientesListener() {
    return this.pacientesObservable.asObservable();
  }

  addPaciente(newPaciente: Paciente) {
    this.http
      .post<{ message: String; data: Paciente }>(BACKEND_URL, newPaciente)
      .subscribe((responseData: any) => {
        window.location.reload();
      });
  }

  updatePaciente(paciente: Paciente) {
    this.http.put(BACKEND_URL, paciente).subscribe((responseData) => {
      window.location.reload();
    })
  }

  deletePaciente(id_paciente: Number) {
    return this.http.delete<{ message: String; data: any }>(BACKEND_URL, {
      body: { id_paciente: id_paciente },
    });
  }
}
