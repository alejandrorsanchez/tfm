import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-type-operation-dialog',
  templateUrl: './type-add-dialog.component.html',
  styleUrls: ['./type-add-dialog.component.css']
})
export class TypeAddDialogComponent implements OnInit {

  constructor(public router: Router, public dialogRef: MatDialogRef<TypeAddDialogComponent>) { }

  ngOnInit(): void {
  }

  getAdoptionAdds() {
    this.dialogRef.close();
    this.router.navigateByUrl('home/adds/1');

  }

  getVolunteerAdds() {
    this.dialogRef.close();
    this.router.navigateByUrl('home/adds/2');
  }
}
