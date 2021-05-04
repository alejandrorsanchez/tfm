import {Component, OnInit} from '@angular/core';
import {User} from "../shared/user";
import {UserService} from "../shared/user.service";
import {MatDialogRef} from "@angular/material/dialog";
import {UtilsService} from "../shared/utils.service";

@Component({
  selector: 'app-sing-up-dialog',
  templateUrl: './sing-up-dialog.component.html',
  styleUrls: ['./sing-up-dialog.component.css']
})
export class SingUpDialogComponent implements OnInit{

  title: string;
  newUser: User;
  repeatPassword = '';

  constructor(public dialogRef: MatDialogRef<SingUpDialogComponent>, private userService: UserService
              , private utilsService: UtilsService) {
    this.title = 'Registro';
  }

  ngOnInit(): void {
    this.newUser = new User();
  }

  verifyUserName() {
    if(this.newUser.username != ''){
      this.userService.findByUsername(this.newUser.username).subscribe(
        response => {
          if(response[0]){
            this.utilsService.showNotification('Ese usuario ya existe');
          }
        }
      );
    }
  }

  fieldsAreCorrect(): boolean {
    if (this.newUser.password !== this.repeatPassword){
      this.utilsService.showNotification('Las contraseñas no coinciden');
      return false;
    }else if (this.newUser.username.length > 8 ){
      this.utilsService.showNotification('El nombre de usuario debe tener una longitud no superior a 8 caracteres');
      return false;
    }
    return true;
  }

  saveUser(){
    const addressInput = document.getElementById("address") as HTMLInputElement;
    this.newUser.address = addressInput.value;
    if (this.fieldsAreCorrect()){
      this.userService.save(this.newUser).subscribe(
        response => {
          this.utilsService.showNotification(response['message']);
          this.dialogRef.close();
        }
      );
    }
  }

  autocompleteFocus() {
    const addressField = document.getElementById("address") as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(addressField, {
      fields: ["address_components", "geometry"],
      types: ["address"]
    });
  }

  invalid(): boolean {
    return this.check(this.newUser.username) || this.check(this.newUser.password) || this.check(this.repeatPassword)
          || this.check(this.newUser.address) || this.check(this.newUser.description);
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }
}
