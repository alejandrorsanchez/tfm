import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DeleteAccountDialogComponent} from "./delete-account-dialog.component";
import {User} from "../shared/user";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../shared/user.service";
import {UtilsService} from "../shared/utils.service";
import {DeletePetDialogComponent} from "./delete-pet-dialog.component";
import {Pet} from "../shared/pet";
import {PetService} from "../shared/pet.service";
import {AddUpdatePetDialogComponent} from "./add-update-pet-dialog.component";

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
        this.myPets = [];
        for (const key in response) {
          let pet = new Pet();
          pet.copyProperties(response[key]);
          this.myPets.push(pet);
        }
      }
    );
  }

  openDeleteUserDialog() {
    this.dialog.open(DeleteAccountDialogComponent, {
      data: this.user,
      height: '220px',
      width: '400px',
    });
  }

  autocompleteFocus() {
    const addressInput = document.getElementById("address") as HTMLInputElement;
    const addressAutocomplete = new google.maps.places.Autocomplete(addressInput);
    addressAutocomplete.setFields(["place_id"]);
  }

  cancelUpdate() {
    location.reload();
  }

  updateUser() {
    this.userService.update(this.user).subscribe(
      response => {
        this.getUser();
        this.utilsService.showNotification(response['message']);
      }
    );
  }

  invalid(): boolean {
    return this.check(this.user.address) || this.check(this.user.description);
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }

  openAddPetDialog() {
    this.dialog.open(AddUpdatePetDialogComponent, {
      height: '500px',
      width: '400px',
    }).afterClosed().subscribe(
      response => {
        this.getUserPets(this.id);
      }
    );
  }

  openUpdatePetDialog(pet: Pet) {
    this.dialog.open(AddUpdatePetDialogComponent, {
      data: pet,
      height: '500px',
      width: '400px',
    }).afterClosed().subscribe(
      response => {
        this.getUserPets(this.id);
      }
    );
  }

  openDeletePetDialog(pet: Pet) {
    this.dialog.open(DeletePetDialogComponent, {
      data: pet,
      height: '250px',
      width: '400px',
    }).afterClosed().subscribe(
      response => {
        this.getUserPets(this.id);
      }
    );
  }

  hasNoPets() {
    return this.myPets.length == 0;
  }
}
