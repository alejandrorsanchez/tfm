import { Component } from '@angular/core';
import {SingUpDialogComponent} from "../user/sing-up-dialog.component";
import {LogInDialogComponent} from "../user/log-in-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent{

  constructor(private dialog: MatDialog) { }

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
