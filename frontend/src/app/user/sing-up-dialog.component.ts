import {Component, OnInit} from '@angular/core';
import {User} from "./user";
import {UserService} from "./user.service";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sing-up-dialog',
  templateUrl: './sing-up-dialog.component.html',
  styleUrls: ['./sing-up-dialog.component.css']
})
export class SingUpDialogComponent implements OnInit{

  title: string;
  newUser: User;
  repeatPassword = '';
  message = '';

  constructor(public dialogRef: MatDialogRef<SingUpDialogComponent>, private userService: UserService
              , private snackBar: MatSnackBar) {
    this.title = 'Registro';
  }

  ngOnInit(): void {
    this.newUser = new User();
  }

  verifyUserName() {
    if(this.newUser.username != ''){
      this.userService.findUser(this.newUser.username).subscribe(
        response => {
          if(response[0]){
            this.message = 'Ese usuario ya existe';
            this.openSnackBar(this.message);
          }
        }
      );
    }
  }

  fieldsAreCorrect(): boolean {
    if (this.newUser.password !== this.repeatPassword){
      this.message = 'Las contraseñas no coinciden';
      this.openSnackBar(this.message);
      return false;
    }else if (this.newUser.username.length > 8 ){
      this.message = 'El nombre de usuario debe tener una longitud no superior a 8 caracteres';
      this.openSnackBar(this.message);
      return false;
    }
    return true;
  }

  saveUser(){
    if (this.fieldsAreCorrect()){
      this.userService.save(this.newUser).subscribe(
        response => {
          this.message = response['message'];
          this.openSnackBar(this.message);
          setTimeout(() => {
            this.dialogRef.close();
          }, 2000);
        }
      );
    }
  }

  invalid(): boolean {
    return this.check(this.newUser.username) || this.check(this.newUser.password)
      || this.check(this.repeatPassword) || this.check(this.newUser.description);
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000,
    });
  }

}
