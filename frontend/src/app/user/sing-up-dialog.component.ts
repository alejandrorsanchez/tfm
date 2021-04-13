import { Component } from '@angular/core';
import {User} from "./user";
import {UserService} from "./user.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-sing-up-dialog',
  templateUrl: './sing-up-dialog.component.html',
  styleUrls: ['./sing-up-dialog.component.css']
})
export class SingUpDialogComponent{

  newUser = new User();
  repeatPassword = '';
  errorMessage = false;
  message = '';
  registerSuccess = false;
  successMessage = '';

  constructor(public dialogRef: MatDialogRef<SingUpDialogComponent>, private userService: UserService) {}

  verifyUserName() {
    this.userService.findUser(this.newUser.username).subscribe(
      response => {
        if(response[0]){
          this.errorMessage = true;
          this.message = 'Ese usuario ya existe';
        }else{
          this.errorMessage = false;
        }
      }
    );
  }

  checkFields() {
    this.errorMessage = false;
    if (this.newUser.password !== this.repeatPassword){
      this.errorMessage = true;
      this.message = 'Passwords do not match';
    }else if (this.newUser.username === '' || this.newUser.password === '' || this.repeatPassword === '' || this.newUser.description === ''){
      this.errorMessage = true;
      this.message = 'Empty fields';
    }else if (this.newUser.username.length > 8 ){
      this.errorMessage = true;
      this.message = 'The username must be no longer than 8 characters';
    }
  }

  saveUser(){
    this.checkFields();
    if (!this.errorMessage){
      this.userService.save(this.newUser).subscribe(
        response => {
          this.registerSuccess = true;
          this.successMessage = response['message'];
          setTimeout(() => {
            this.dialogRef.close();
          }, 2000);
        }
      );
    }
    this.emptyForm();
  }

  emptyForm() {
    this.newUser = new User();
    this.repeatPassword = '';
  }

}
