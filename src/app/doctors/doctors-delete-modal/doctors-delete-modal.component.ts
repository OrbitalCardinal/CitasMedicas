import {Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
    selector: "doctors-delete-modal",
    templateUrl: "./doctors-delete-modal.component.html",
    styleUrls: ["./doctors-delete-modal.component.scss"]
})

export class DoctorsDeleteModal {
    @Input() id_doctor!: Number;
    @Output() onCancel = new EventEmitter<boolean>();
    @Output() onDelete = new EventEmitter<Number>();

    setDelete(id_doctor: Number) {
        this.onDelete.emit(id_doctor);
      }
    
      setCancel() {
          this.onCancel.emit(false);
      }
}