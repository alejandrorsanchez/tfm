import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "./user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "./user";
import {UtilsService} from "../shared/utils.service";

@Component({
  selector: 'app-log-in-dialog',
  templateUrl: './log-in-dialog.component.html',
  styleUrls: ['./log-in-dialog.component.css']
})
export class LogInDialogComponent implements OnInit{

  title: string;
  user: User;
  message = '';

  constructor(public dialogRef: MatDialogRef<LogInDialogComponent>, private userService: UserService
              , private snackBar: MatSnackBar, private utilsService: UtilsService) {
    this.title = 'Inicio de Sesión';
  }

  ngOnInit(): void {
    this.user = new User();
  }

  logIn(): void {
    this.userService.getUser(this.user).subscribe(
      response => {
          this.utilsService.saveToken(response.body['token']);
          this.dialogRef.close();
      },
      error => {
        this.message = 'Ese usuario no existe';
        this.openSnackBar(this.message);
      }
    );
  }

  invalid(): boolean {
    return this.check(this.user.username) || this.check(this.user.password);
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
