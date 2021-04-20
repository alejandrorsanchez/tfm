import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../shared/user";
import {UserService} from "../user/user.service";
import {UtilsService} from "../shared/utils.service";
import {Router} from "@angular/router";
import {Pet} from "../shared/pet";

@Component({
  selector: 'app-delete-pet-dialog',
  templateUrl: './delete-pet-dialog.component.html',
  styleUrls: ['./delete-pet-dialog.component.css']
})
export class DeletePetDialogComponent{

  pet: Pet;

  constructor(@Inject(MAT_DIALOG_DATA) data: Pet, public dialogRef: MatDialogRef<DeletePetDialogComponent>, private userService: UserService) {
    this.pet = data ? data : undefined;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  deletePet() {

  }
}
