import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DeleteAccountDialogComponent} from "./delete-account-dialog.component";
import {User} from "../shared/models/user";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../shared/services/user.service";
import {UtilsService} from "../shared/services/utils.service";
import {DeletePetDialogComponent} from "./delete-pet-dialog.component";
import {Pet} from "../shared/models/pet";
import {PetService} from "../shared/services/pet.service";
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

  getUser(): void {
    this.id = this.utilsService.getId();
    this.userService.findById(this.id).subscribe(
      (user: User) => this.user = user
    );
  }

  getUserPets(id: string): void {
    this.petService.findByUserId(id).subscribe(
      (response: Pet[]) => {
          this.myPets = response;
        /*this.myPets = [];
        for (const key in response) {
          let pet = new Pet();
          pet = response[key];
          this.myPets.push(pet);
        }*/
      }
    );
  }

  autocompleteFocus(): void {
    const addressField = document.getElementById("address") as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(addressField, {
      fields: ["address_components", "geometry"],
      types: ["address"]
    });
  }

  updateUser(): void {
    const addressInput = document.getElementById("address") as HTMLInputElement;
    this.user.address = addressInput.value;
    this.userService.update(this.user).subscribe(
      response => {
        this.getUser();
        this.utilsService.showNotification(response['message']);
      }
    );
  }

  cancelUpdate(): void {
    location.reload();
  }

  openDeleteUserDialog(): void {
    this.dialog.open(DeleteAccountDialogComponent, {
      data: this.id,
      width: '400px',
    });
  }

  openAddPetDialog(): void {
    this.dialog.open(AddUpdatePetDialogComponent, {
      width: '400px',
    }).afterClosed().subscribe(
      () => this.getUserPets(this.id)
    );
  }

  openUpdatePetDialog(pet: Pet): void {
    this.dialog.open(AddUpdatePetDialogComponent, {
      data: pet,
      width: '400px',
    }).afterClosed().subscribe(
      () => this.getUserPets(this.id)
    );
  }

  openDeletePetDialog(pet: Pet): void {
    this.dialog.open(DeletePetDialogComponent, {
      data: pet.id,
      width: '400px',
    }).afterClosed().subscribe(
      () => this.getUserPets(this.id)
    );
  }

  petsIsEmpty(): boolean {
    return this.myPets.length == 0;
  }

  invalid(): boolean {
    return this.check(this.user.address) || this.check(this.user.description)
      || this.check(this.user.email) || !this.user.email.includes('@gmail.com');
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }
}
