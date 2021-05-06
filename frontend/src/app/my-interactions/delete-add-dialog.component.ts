import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AddService} from "../shared/add.service";

@Component({
  selector: 'app-delete-add-dialog',
  templateUrl: './delete-add-dialog.component.html'
})
export class DeleteAddDialogComponent {

  id: number;

  constructor(@Inject(MAT_DIALOG_DATA) data: number, public dialogRef: MatDialogRef<DeleteAddDialogComponent>, private addService: AddService) {
    this.id = data ? data : undefined;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  delete() {
    this.addService.delete(this.id).subscribe(
      response => this.dialogRef.close()
    );
  }
}
