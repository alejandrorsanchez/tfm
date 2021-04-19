import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.css']
})
export class DeleteAccountDialogComponent{

  constructor(public dialogRef: MatDialogRef<DeleteAccountDialogComponent>) { }

  onNoClick() {
    this.dialogRef.close();
  }

  deleteUser() {
    //TODO
  }
}
