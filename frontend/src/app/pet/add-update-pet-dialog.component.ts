import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Pet} from "../shared/pet";
import {PetService} from "./pet.service";
import {UtilsService} from "../shared/utils.service";

@Component({
  selector: 'app-update-pet-dialog',
  templateUrl: './add-update-pet-dialog.component.html',
  styleUrls: ['./add-update-pet-dialog.component.css']
})
export class AddUpdatePetDialogComponent implements OnInit{

  pet: Pet;
  image: File;
  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: Pet, public dialogRef: MatDialogRef<AddUpdatePetDialogComponent>
              , private petService: PetService, private utilsService: UtilsService) {
    this.pet = data ? data : new Pet();
    this.title = data ? this.pet.name : 'Nueva mascota';
  }

  ngOnInit(): void {
    this.pet.user_id = this.utilsService.getId();
  }

  onFileChanged(event) {
    this.image = event.target.files[0];
    this.pet.picture = this.image.name;
  }

  update() {
    this.petService.update(this.pet).subscribe(
      response => {
        this.createFormDataForFile();
        this.utilsService.showNotification(response['message']);
      }
    );
  }

  save() {
    this.petService.save(this.pet).subscribe(
      response => {
        this.pet.id = response['id'];
        this.createFormDataForFile();
        this.utilsService.showNotification(response['message']);
      }
    );
  }

  createFormDataForFile() {
    const formData = new FormData();
    formData.append('image', this.image);
    formData.append('id', this.pet.id.toString());
    formData.append('name', this.image.name);
    this.petService.uploadPhoto(formData).subscribe(
      response => this.dialogRef.close()
    );
  }

  invalid(): boolean {
    return this.check(this.pet.name) || this.check(this.pet.breed)
        || this.check(this.pet.age) || this.check(this.pet.description)
        || this.check(this.image);
  }

  check(attr: any): boolean {
    return attr === undefined || null || attr === '';
  }

  isCreate(): boolean {
    return this.pet.id === undefined;
  }
}
