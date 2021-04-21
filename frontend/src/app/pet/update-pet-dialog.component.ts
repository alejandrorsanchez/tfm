import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Pet} from "../shared/pet";
import {PetService} from "./pet.service";

@Component({
  selector: 'app-update-pet-dialog',
  templateUrl: './update-pet-dialog.component.html',
  styleUrls: ['./update-pet-dialog.component.css']
})
export class UpdatePetDialogComponent implements OnInit{

  pet: Pet;
  image: File;
  imageSelected: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) data: Pet, public dialogRef: MatDialogRef<UpdatePetDialogComponent>, private petService: PetService) {
    this.pet = data ? data : undefined;

  }

  ngOnInit(): void {
        this.imageSelected = this.pet.picture != null;
    }

  update() {
    //TODO
  }

  invalid(): boolean {
    return this.check(this.pet.name) || this.check(this.pet.breed) || this.check(this.pet.age)
            || this.check(this.pet.description);
  }

  check(attr: any): boolean {
    return attr === undefined || null || attr === '';
  }

  onFileChanged(event) {
    this.image = event.target.files[0];
    this.imageSelected = true;
  }
}
