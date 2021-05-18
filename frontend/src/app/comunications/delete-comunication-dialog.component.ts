import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ComunicationService} from "../shared/services/comunication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-comunication-dialog',
  templateUrl: './delete-comunication-dialog.component.html'
})
export class DeleteComunicationDialogComponent {

  id: number;

  constructor(@Inject(MAT_DIALOG_DATA) data: number, public dialogRef: MatDialogRef<DeleteComunicationDialogComponent>,
              private comunicationService: ComunicationService, public router: Router) {
    this.id = data ? data : undefined;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  deleteComunication() {
    this.comunicationService.delete(this.id).subscribe(
      response => {
        this.dialogRef.close();
        this.router.navigateByUrl('/home/interactions');
      }
    );
  }
}
