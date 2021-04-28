import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Pet} from "../shared/pet";
import {PetService} from "../shared/pet.service";

@Component({
  selector: 'app-delete-pet-dialog',
  templateUrl: './delete-pet-dialog.component.html'
})
export class DeletePetDialogComponent{

  id: number;

  constructor(@Inject(MAT_DIALOG_DATA) data: number, public dialogRef: MatDialogRef<DeletePetDialogComponent>, private petService: PetService) {
    this.id = data ? data : undefined;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  delete() {
    this.petService.delete(this.id).subscribe(
      response => this.dialogRef.close()
    );
  }
}
