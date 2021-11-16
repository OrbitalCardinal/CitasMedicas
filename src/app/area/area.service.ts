import { Area } from './area.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const BACKEND_URL = 'http://localhost:3000/areas';

@Injectable({ providedIn: 'root' })
export class AreaService {
  private areas: Area[] = [];
  private areasObservable = new Subject<{ areas: Area[] }>();

  constructor(private http: HttpClient, private router: Router) {}

  getAreaById(id: Number) {
    return this.http.get<{message: String, data: Area}>(BACKEND_URL + "?id=" + id).pipe(map((areaData) => {
      return {
        id_area: areaData.data.id_area,
        nombre: areaData.data.nombre,
        fecha_reg: areaData.data.fecha_reg
      }
    }));
  }

  getAreas() {
    this.http
      .get<{ message: String; data: Area[] }>(BACKEND_URL)
      .pipe(
        map((areasData) => {
          return {
            areas: areasData.data.map((area) => {
              return {
                id_area: area.id_area,
                nombre: area.nombre,
                fecha_reg: area.fecha_reg
              };
            }),
          };
        })
      )
      .subscribe((transformedAreas) => {
        this.areas = transformedAreas.areas;
        this.areasObservable.next({ areas: [...this.areas] });
      });
  }

  getAreasListener() {
    return this.areasObservable.asObservable();
  }

  addArea(newArea: Area) {
      const request = this.http
      .post<{ message: String; data: Area }>(BACKEND_URL, newArea);
      return request;
  }

  // updatePaciente(paciente: Paciente) {
  //   this.http.put(BACKEND_URL, paciente).subscribe((responseData) => {
  //     window.location.reload();
  //   })
  // }

//   deleteDoctor(id_doctor: Number) {
//     return this.http.delete<{ message: String; data: any }>(BACKEND_URL, {
//       body: { id_doctor: id_doctor},
//     });
//   }
}
