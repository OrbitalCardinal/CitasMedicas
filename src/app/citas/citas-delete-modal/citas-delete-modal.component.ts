import {Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
    selector: "citas-delete-modal",
    templateUrl: "./citas-delete-modal.component.html",
    styleUrls: ["./citas-delete-modal.component.scss"]
})

export class CitasDeleteModal {
    @Input() id_cita!: Number;
    @Output() onCancel = new EventEmitter<boolean>();
    @Output() onDelete = new EventEmitter<Number>();

    setDelete(id_cita: Number) {
        this.onDelete.emit(id_cita);
      }
    
      setCancel() {
          this.onCancel.emit(false);
      }
}