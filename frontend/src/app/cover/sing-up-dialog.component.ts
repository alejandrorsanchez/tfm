import {Component, OnInit} from '@angular/core';
import {User} from "../shared/models/user";
import {UserService} from "../shared/services/user.service";
import {MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../shared/services/notification.service";

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
              , private notificationService: NotificationService) {
    this.title = 'Registro';
  }

  ngOnInit(): void {
    this.newUser = new User();
  }

  verifyUserName(): void {
    if(this.newUser.username != ''){
      this.userService.findByUsername(this.newUser.username).subscribe(
        () => {},
        error => this.notificationService.showNotification(error.error['message'])
      );
    }
  }

  fieldsAreCorrect(): boolean {
    if (this.newUser.password !== this.repeatPassword){
      this.notificationService.showNotification('Las contraseñas no coinciden');
      return false;
    }else if (this.newUser.username.length > 8 ){
      this.notificationService.showNotification('El nombre de usuario debe tener una longitud no superior a 8 caracteres');
      return false;
    }else if(!this.newUser.email.includes('@gmail.com')){
      this.notificationService.showNotification('El correo no tiene el formato adecuado');
      return false;
    }
    return true;
  }

  saveUser(): void {
    const addressInput = document.getElementById("address") as HTMLInputElement;
    this.newUser.address = addressInput.value;
    if (this.fieldsAreCorrect()){
      this.userService.save(this.newUser).subscribe(
        response => {
          this.notificationService.showNotification(response['message']);
          this.dialogRef.close();
          }
        );
    }
  }

  autocompleteFocus(): void {
    const addressField = document.getElementById("address") as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(addressField, {
      fields: ["address_components", "geometry"],
      types: ["address"]
    });
  }

  invalid(): boolean {
    return this.check(this.newUser.username) || this.check(this.newUser.password) || this.check(this.repeatPassword)
          || this.check(this.newUser.address) || this.check(this.newUser.description) || this.check(this.newUser.email);
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }
}
