import { Doctor } from './doctor.model';
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

  getHorarioDoctor(id_doctor: any) {
    return this.http.get<{message: String, data: Object}>(BACKEND_URL + "?horario=1&idDoctor=" + id_doctor).toPromise()
  }

  getDoctores() {
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
        this.doctoresObservable.next({ doctores: [...this.doctores] });
      });
  }

  getDoctoresListener() {
    return this.doctoresObservable.asObservable();
  }

  addDoctor(newDoctor: Object) {
    this.http
      .post<{ message: String; data: Object }>(BACKEND_URL, newDoctor)
      .subscribe((responseData: any) => {
        window.location.reload();
      });
  }

  updateDoctor(doctor: Doctor) {
    this.http.put(BACKEND_URL, doctor).subscribe((responseData) => {
      window.location.reload();
    })
  }

  deleteDoctor(id_doctor: Number) {
    return this.http.delete<{ message: String; data: any }>(BACKEND_URL, {
      body: { id_doctor: id_doctor},
    });
  }
}
