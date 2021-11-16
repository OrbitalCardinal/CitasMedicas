import { Hora } from './hora.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const BACKEND_URL = 'http://localhost:3000/horas';

@Injectable({ providedIn: 'root' })
export class HoraService {
  constructor(private http: HttpClient, private router: Router) {}

  getHoraById(id: Number) {
    return this.http.get<{message: String, data: Hora}>(BACKEND_URL + "?id=" + id).pipe(map((horaData) => {
      return {
        id_hora: horaData.data.id_hora,
        hora_inicial: horaData.data.hora_inicial,
        hora_final: horaData.data.hora_final
      }
    }));
  }

  getHoras() {
    return this.http
      .get<{ message: String; data: Hora[] }>(BACKEND_URL)
      .pipe(
        map((horasData) => {
          return {
            horas: horasData.data.map((hora) => {
              return {
                id_hora: hora.id_hora,
                hora_inicial: hora.hora_inicial,
                hora_final: hora.hora_final
              };
            }),
          };
        })
      );
  }
}
