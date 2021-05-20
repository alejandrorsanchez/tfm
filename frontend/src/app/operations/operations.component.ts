import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TypeAddDialogComponent} from "./type-add-dialog.component";

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent {

  constructor(public router: Router, private dialog: MatDialog) { }

  publishAdd(): void {
    this.router.navigateByUrl('home/publish');
  }

  openTypeAddDialog(): void {
    this.dialog.open(TypeAddDialogComponent, {
      width: '60%',
    });
  }
}
