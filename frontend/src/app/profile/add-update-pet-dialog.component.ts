import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Pet} from "../shared/models/pet";
import {PetService} from "../shared/services/pet.service";
import {SessionService} from "../shared/services/session.service";
import {NotificationService} from "../shared/services/notification.service";

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
              , private petService: PetService, private sessionService: SessionService, private notificationService: NotificationService) {
    this.pet = data ? data : new Pet();
    this.title = data ? this.pet.name : 'Nueva mascota';
  }

  ngOnInit(): void {
    this.pet.userId = this.sessionService.getId();
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
        this.notificationService.showNotification(response['message']);
      }
    );
  }

  save(): void {
    this.petService.save(this.pet).subscribe(
      response => {
        this.pet.id = response['id'];
        this.createFormDataAndPostImage();
        this.notificationService.showNotification(response['message']);
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
