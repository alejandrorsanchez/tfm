import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Pet} from "../shared/models/pet";
import {PetService} from "../shared/services/pet.service";
import {UtilsService} from "../shared/services/utils.service";

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

  update(): void {
    this.petService.update(this.pet).subscribe(
      response => {
        if(this.image){
          this.createFormDataAndPostImage();
        }
        this.dialogRef.close();
        this.utilsService.showNotification(response['message']);
      }
    );
  }

  save(): void {
    this.petService.save(this.pet).subscribe(
      response => {
        this.pet.id = response['id'];
        this.createFormDataAndPostImage();
        this.utilsService.showNotification(response['message']);
      }
    );
  }

  createFormDataAndPostImage() {
    const formData = new FormData();
    formData.append('image', this.image);
    formData.append('id', this.pet.id.toString());
    formData.append('name', this.image.name);
    this.petService.uploadPhoto(formData).subscribe(
      () => this.dialogRef.close()
    );
  }

  isCreate(): boolean {
    return this.pet.id === undefined;
  }

  invalid(): boolean {
    return this.check(this.pet.name) || this.check(this.pet.breed)
      || this.check(this.pet.age) || this.check(this.pet.description)
      || this.check(this.pet.picture);
  }

  check(attr: any): boolean {
    return attr === undefined || null || attr === '';
  }
}
