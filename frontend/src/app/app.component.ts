import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SingUpDialogComponent} from "./user/sing-up-dialog.component";
import {LogInDialogComponent} from "./user/log-in-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  constructor(private dialog: MatDialog) {}

  openSingUpDialog() {
    this.dialog.open(SingUpDialogComponent, {
      height: '500px',
      width: '600px',
    });
  }

  openLogInDialog() {
    this.dialog.open(LogInDialogComponent, {
      height: '300px',
      width: '400px',
    });
  }
}
