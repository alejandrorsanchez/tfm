import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DeleteAccountDialogComponent} from "../user/delete-account-dialog.component";
import {User} from "../user/user";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user/user.service";
import {UtilsService} from "../shared/utils.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id: string;
  user = new User();
  myPets: string[] = ['Simba', 'Chloe'];

  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute, private userService: UserService
            , private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.id = this.utilsService.getId();
    this.userService.findById(this.id).subscribe(
      response => {
        this.user = response[0];
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

  updatePet(pet: string) {

  }

  deletePet(pet: string) {

  }

  hasNoPets() {
    return this.myPets.length == 0;
  }
}
