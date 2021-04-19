import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LogInDialogComponent} from "../user/log-in-dialog.component";
import {DeleteAccountDialogComponent} from "../user/delete-account-dialog.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  hasPets = true;
  myPets: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  autocompleteFocus() {

  }

  updateUser() {

  }

  invalid(): boolean {
    return false;
  }

  cancelUpdate() {

  }

  openDeleteUserDialog() {
    this.dialog.open(DeleteAccountDialogComponent, {
      height: '220px',
      width: '400px',
    });
  }

  updatePet(pet: string) {
    console.log(pet);
  }
}
