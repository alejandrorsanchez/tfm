import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DeleteAccountDialogComponent} from "../user/delete-account-dialog.component";
import {User} from "../shared/user";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user/user.service";
import {UtilsService} from "../shared/utils.service";
import {DeletePetDialogComponent} from "./delete-pet-dialog.component";
import {Pet} from "../shared/pet";
import {PetService} from "./pet.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id: string;
  user = new User();
  myPets: Pet[] = [];

  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute, private userService: UserService
            , private utilsService: UtilsService, private petService: PetService) {
  }

  ngOnInit(): void {
    this.getUser();
    this.getUserPets(this.id);
  }

  getUser(){
    this.id = this.utilsService.getId();
    this.userService.findById(this.id).subscribe(
      response => {
        this.user = response[0];
      }
    );
  }

  getUserPets(id: string) {
    this.petService.findByUserId(id).subscribe(
      response => {
        for (const key in response) {
          let pet = new Pet();
          pet.copyProperties(response[key]);
          this.myPets.push(pet);
        }
      }
    );
  }

  autocompleteFocus() {
    const addressInput = document.getElementById("address") as HTMLInputElement;
    const addressAutocomplete = new google.maps.places.Autocomplete(addressInput);
    addressAutocomplete.setFields(["place_id"]);
  }

  updateUser() {
    this.userService.update(this.user).subscribe(
      response => {
        this.getUser();
        this.utilsService.showNotification('Usuario actualizado');
      }
    );
  }

  invalid(): boolean {
    return false;
  }

  cancelUpdate() {
    location.reload();
  }

  openDeleteUserDialog() {
    this.dialog.open(DeleteAccountDialogComponent, {
      data: this.user,
      height: '220px',
      width: '400px',
    });
  }

  updatePet(pet: Pet) {

  }

  deletePet(pet: Pet) {
    this.dialog.open(DeletePetDialogComponent, {
      data: pet,
      height: '250px',
      width: '400px',
    });
  }

  hasNoPets() {
    return this.myPets.length == 0;
  }
}
