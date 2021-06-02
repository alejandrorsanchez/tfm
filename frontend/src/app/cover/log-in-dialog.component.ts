import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/models/user";
import {SessionService} from "../shared/services/session.service";
import {Router} from "@angular/router";
import {NotificationService} from "../shared/services/notification.service";

@Component({
  selector: 'app-log-in-dialog',
  templateUrl: './log-in-dialog.component.html',
  styleUrls: ['./log-in-dialog.component.css']
})
export class LogInDialogComponent implements OnInit{

  title: string;
  user: User;

  constructor(public dialogRef: MatDialogRef<LogInDialogComponent>, private userService: UserService
             , private sessionService: SessionService, public router: Router, private notificationService: NotificationService) {
    this.title = 'Inicio de Sesión';
  }

  ngOnInit(): void {
    this.user = new User();
  }

  logIn(): void {
    this.userService.getUser(this.user).subscribe(
      response => {
          this.sessionService.saveCredentials(response.body);
          this.dialogRef.close();
          this.router.navigateByUrl('/home');
      },
      error => this.notificationService.showNotification(error.error['message'])
    );
  }

  invalid(): boolean {
    return this.check(this.user.username) || this.check(this.user.password);
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }

}
