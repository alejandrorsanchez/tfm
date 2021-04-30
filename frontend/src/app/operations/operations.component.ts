import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TypeAddDialogComponent} from "./type-add-dialog.component";

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  constructor(public router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  publishAdd() {
    this.router.navigateByUrl('home/publish');
  }

  openTypeAddDialog() {
    this.dialog.open(TypeAddDialogComponent, {
      width: '60%',
    });
  }
}
