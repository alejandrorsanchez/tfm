import {Component, OnInit} from '@angular/core';
import {User} from "./user";
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "./user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-log-in-dialog',
  templateUrl: './log-in-dialog.component.html',
  styleUrls: ['./log-in-dialog.component.css']
})
export class LogInDialogComponent implements OnInit{

  title: string;
  user: User;

  constructor(public dialogRef: MatDialogRef<LogInDialogComponent>, private userService: UserService
              , private snackBar: MatSnackBar) {
    this.title = 'Inicio de Sesión';
  }

  ngOnInit(): void {
    this.user = new User();
  }

  logIn(): void {
    //TODO
  }

  invalid(): boolean {
    return this.check(this.user.username) || this.check(this.user.password);
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }
}
