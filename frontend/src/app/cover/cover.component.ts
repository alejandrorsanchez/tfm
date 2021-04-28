import { Component } from '@angular/core';
import {SingUpDialogComponent} from "./sing-up-dialog.component";
import {LogInDialogComponent} from "./log-in-dialog.component";
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
      width: '600px',
    });
  }

  openLogInDialog() {
    this.dialog.open(LogInDialogComponent, {
      width: '400px',
    });
  }

}
