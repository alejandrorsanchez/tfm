import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-type-operation-dialog',
  templateUrl: './type-add-dialog.component.html',
  styleUrls: ['./type-add-dialog.component.css']
})
export class TypeAddDialogComponent {

  constructor(public router: Router, public dialogRef: MatDialogRef<TypeAddDialogComponent>) { }

  findAdds(type: number) {
    this.dialogRef.close();
    this.router.navigateByUrl('home/adds/' + type);
  }
}
