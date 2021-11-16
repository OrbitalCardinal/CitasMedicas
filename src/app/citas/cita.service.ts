import { Cita } from './cita.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const BACKEND_URL = 'http://localhost:3000/citas';

@Injectable({ providedIn: 'root' })
export class CitaService {
  private citas: Cita[] = [];
  private citasObservable = new Subject<{ citas: Cita[] }>();

  constructor(private http: HttpClient, private router: Router) {}

  getCitas() {
    this.http
      .get<{ message: String; data: Cita[] }>(BACKEND_URL)
      .pipe(
        map((citasData) => {
          return {
            citas: citasData.data.map((citas) => {
              return {
                id_cita: citas.id_cita,
                id_hora: citas.id_hora,
                id_doctor: citas.id_doctor,
                id_paciente: citas.id_paciente,
                fecha: citas.fecha
              };
            }),
          };
        })
      )
      .subscribe((transformedCitas) => {
        this.citas = transformedCitas.citas;
        this.citasObservable.next({ citas: [...this.citas] });
      });
  }

  getCitasListener() {
    return this.citasObservable.asObservable();
  }

  addCita(newCita: Cita) {
    this.http
      .post<{ message: String; data: Cita }>(BACKEND_URL, newCita)
      .subscribe((responseData: any) => {
        window.location.reload();
      });
  }

  updateCita(cita: Cita) {
    this.http.put(BACKEND_URL, cita).subscribe((responseData) => {
      window.location.reload();
    })
  }

  deleteCita(id_cita: Number) {
    return this.http.delete<{ message: String; data: any }>(BACKEND_URL, {
      body: { id_cita: id_cita },
    });
  }
}
