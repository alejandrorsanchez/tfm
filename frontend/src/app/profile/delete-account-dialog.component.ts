import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../shared/user.service";
import {UtilsService} from "../shared/utils.service";
import {Router} from "@angular/router";
import {User} from "../shared/user";

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html'
})
export class DeleteAccountDialogComponent{

  id: number;

  constructor(@Inject(MAT_DIALOG_DATA) data: number, public dialogRef: MatDialogRef<DeleteAccountDialogComponent>, private userService: UserService,
              private utilsService: UtilsService, public router: Router) {
    this.id = data ? data : undefined;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  deleteUser() {
    this.userService.delete(this.id).subscribe(
      response => {
        this.utilsService.destroySession();
        this.dialogRef.close();
        this.router.navigateByUrl('/');
      }
    );
  }
}