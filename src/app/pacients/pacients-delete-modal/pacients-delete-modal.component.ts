import {Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
    selector: "pacients-delete-modal",
    templateUrl: "./pacients-delete-modal.component.html",
    styleUrls: ["./pacients-delete-modal.component.scss"]
})

export class PacientsDeleteModal {
    @Input() id_paciente!: Number;
    @Output() onCancel = new EventEmitter<boolean>();
    @Output() onDelete = new EventEmitter<Number>();

    setDelete(id_paciente: Number) {
        this.onDelete.emit(id_paciente);
      }
    
      setCancel() {
          this.onCancel.emit(false);
      }
}