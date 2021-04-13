import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import {User} from "./models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  newUser = new User();
  repeatPassword = '';
  errorMessage = false;
  message = '';
  registerSuccess = false;
  successMessage = '';

  constructor(private userService: UserService) {}

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
