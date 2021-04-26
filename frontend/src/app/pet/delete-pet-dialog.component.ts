import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Pet} from "../shared/pet";
import {PetService} from "../shared/pet.service";

@Component({
  selector: 'app-delete-pet-dialog',
  templateUrl: './delete-pet-dialog.component.html',
  styleUrls: ['./delete-pet-dialog.component.css']
})
export class DeletePetDialogComponent{

  pet: Pet;

  constructor(@Inject(MAT_DIALOG_DATA) data: Pet, public dialogRef: MatDialogRef<DeletePetDialogComponent>, private petService: PetService) {
    this.pet = data ? data : undefined;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  delete() {
    this.petService.delete(this.pet.id).subscribe(
      response => this.dialogRef.close()
    );
  }
}
