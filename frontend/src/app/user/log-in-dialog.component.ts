import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "./user.service";
import {User} from "./user";
import {UtilsService} from "../shared/utils.service";
import {Router} from "@angular/router";

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
             , private utilsService: UtilsService, public router: Router) {
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
          this.router.navigateByUrl('/home');
      },
      error => {
        this.utilsService.showNotification('Ese usuario no exixte');
      }
    );
  }

  invalid(): boolean {
    return this.check(this.user.username) || this.check(this.user.password);
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }

}
