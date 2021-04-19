import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  hasPets = true;
  myPets: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  constructor() { }

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

  deleteUser() {

  }

  updatePet(pet: string) {
    console.log(pet);
  }
}
