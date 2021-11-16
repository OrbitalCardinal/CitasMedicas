import { Hora } from './horas.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const BACKEND_URL = 'http://localhost:3000/doctors';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private doctores: Doctor[] = [];
  private doctoresObservable = new Subject<{ doctores: Doctor[] }>();

  constructor(private http: HttpClient, private router: Router) {}

  getHoras() {
    this.http
      .get<{ message: String; data: Doctor[] }>(BACKEND_URL)
      .pipe(
        map((doctoresData) => {
          return {
            doctores: doctoresData.data.map((doctor) => {
              return {
                id_doctor: doctor.id_doctor,
                nombre: doctor.nombre,
                cedula: doctor.cedula,
                telefono: doctor.telefono,
                correo: doctor.correo,
                fecha_reg: doctor.fecha_reg,
                id_area: doctor.id_area
              };
            }),
          };
        })
      )
      .subscribe((transformedDoctores) => {
        this.doctores = transformedDoctores.doctores;
      });
  }
}
