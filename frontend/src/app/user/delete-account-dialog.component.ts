import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {UserService} from "./user.service";
import {UtilsService} from "../shared/utils.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.css']
})
export class DeleteAccountDialogComponent{

  constructor(public dialogRef: MatDialogRef<DeleteAccountDialogComponent>, private userService: UserService,
              private utilsService: UtilsService, public router: Router) { }

  onNoClick() {
    this.dialogRef.close();
  }

  deleteUser() {/*
    this.userService.delete().subscribe(
      response => {
        this.utilsService.destroySession();
        this.dialogRef.close();
        this.router.navigateByUrl('/');
      }
    );*/
  }
}
