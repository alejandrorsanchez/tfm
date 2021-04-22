import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Pet} from "../shared/pet";
import {PetService} from "./pet.service";
import {UtilsService} from "../shared/utils.service";

@Component({
  selector: 'app-update-pet-dialog',
  templateUrl: './add-update-pet-dialog.component.html',
  styleUrls: ['./add-update-pet-dialog.component.css']
})
export class AddUpdatePetDialogComponent{

  pet: Pet;
  image: File;
  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: Pet, public dialogRef: MatDialogRef<AddUpdatePetDialogComponent>
              , private petService: PetService, private utilsService: UtilsService) {
    this.pet = data ? data : new Pet();
    this.title = data ? this.pet.name : 'Nueva mascota';
  }

  onFileChanged(event) {
    this.image = event.target.files[0];
    this.pet.picture = this.image.name;
  }

  uploadPhoto() {
    const formData = new FormData();
    formData.append('image', this.image);
    this.petService.uploadPhoto(formData).subscribe(
      response => this.utilsService.showNotification(response['message'])
    );
  }

  update() {
    this.petService.update(this.pet).subscribe(
      response => {
        this.utilsService.showNotification(response['message']);
        this.dialogRef.close();
      }
    );
  }

  save() {
    this.petService.save(this.pet).subscribe(
      response => {
        this.utilsService.showNotification(response['message']);
        this.dialogRef.close();
      }
    );
  }

  invalid(): boolean {
    return this.check(this.pet.name) || this.check(this.pet.breed)
              || this.check(this.pet.age) || this.check(this.pet.description);
  }

  check(attr: any): boolean {
    return attr === undefined || null || attr === '';
  }

  isCreate(): boolean {
    return this.pet.id === undefined;
  }
}