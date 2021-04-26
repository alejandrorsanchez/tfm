import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../shared/user.service";
import {UtilsService} from "../shared/utils.service";
import {Router} from "@angular/router";
import {User} from "../shared/user";

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.css']
})
export class DeleteAccountDialogComponent{

  user: User;

  constructor(@Inject(MAT_DIALOG_DATA) data: User, public dialogRef: MatDialogRef<DeleteAccountDialogComponent>, private userService: UserService,
              private utilsService: UtilsService, public router: Router) {
    this.user = data ? data : undefined;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  deleteUser() {
    this.userService.delete(this.user.id).subscribe(
      response => {
        this.utilsService.destroySession();
        this.dialogRef.close();
        this.router.navigateByUrl('/');
      }
    );
  }
}
