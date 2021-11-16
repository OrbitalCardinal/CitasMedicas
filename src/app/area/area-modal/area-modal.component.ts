import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {AreaService} from "../area.service";
import { Area } from "../area.model";
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'area-modal-component',
  templateUrl: './area-modal.component.html',
  styleUrls: ['./area-modal.component.scss'],
})
export class AreaModalComponent implements OnInit {
  constructor(private areaService: AreaService) {}
    @Output() onClose = new EventEmitter<boolean>();
    setClose() {
      this.onClose.emit(false);
    }

    areaControl = new FormControl("", [Validators.required]);

    areas: Area[] = [];
    private areasSubscription!: Subscription;
    displayedColumns: String[] = [
      "ID",
      "Nombre",
      "Fecha_reg"
    ];
    
    ngOnInit() {
      this.areaService.getAreas();
    this.areasSubscription = this.areaService
      .getAreasListener()
      .subscribe((areasData: { areas: Area[] }) => {
        this.areas = areasData.areas;
      });
    }

    onSubmit() {
      const newArea: Area = {
        id_area: 0,
        nombre: this.areaControl.value,
        fecha_reg: new Date()
      }

      this.areaService.addArea(newArea).subscribe((responseData: any) => {
        this.areas = [...this.areas, responseData.data];
      });;
    }

}
