import { Component, OnInit } from '@angular/core';
import {AddService} from "../shared/services/add.service";
import {AddCreation} from "../shared/models/addCreation";
import {UtilsService} from "../shared/services/utils.service";
import {PetService} from "../shared/services/pet.service";
import {Pet} from "../shared/models/pet";
import {MatDialog} from "@angular/material/dialog";
import {DeleteAddDialogComponent} from "./delete-add-dialog.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-interactions',
  templateUrl: './my-interactions.component.html',
  styleUrls: ['./my-interactions.component.css']
})
export class MyInteractionsComponent implements OnInit {

  myAdds: AddCreation[] = [];
  id: string;
  petName: string = '';
  petId: number;
  volunteerAddId: number;
  petAddId: number;

  constructor(private addService: AddService, private utilsService: UtilsService, private petService: PetService
              , public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
    this.id = this.utilsService.getId();
    this.getMyAdds();
  }

  getMyAdds(){
    this.addService.findByUserId(this.id).subscribe(
      (response: AddCreation[]) => {
        this.myAdds = response;
        if(this.addIsPet()){
          this.petService.findById(this.petId.toString()).subscribe(
            (response: Pet) => {
              this.petName = response[0].name;
            }
          );
        }
      }
    );
  }

  addsEmpty(): boolean {
    return this.myAdds.length == 0;
  }

  addIsVolunteer(): boolean {
    for (const add of this.myAdds) {
      if(!add.petId){
        this.volunteerAddId = add.id;
        return true;
      }
    }
    return false;
  }

  addIsPet(): boolean {
    for (const add of this.myAdds) {
      if(add.petId){
        this.petAddId = add.id;
        this.petId = add.petId;
        return true;
      }
    }
    return false;
  }

  openDeleteVolunteerAddDialog() {
    this.dialog.open(DeleteAddDialogComponent, {
      data: this.volunteerAddId,
      width: '400px',
    }).afterClosed().subscribe(
      response => this.getMyAdds()
    );
  }

  openDeletePetAddDialog() {
    this.dialog.open(DeleteAddDialogComponent, {
      data: this.petAddId,
      width: '400px',
    }).afterClosed().subscribe(
      response => this.getMyAdds()
    );
  }

  redirectToHome() {
    this.router.navigateByUrl('/home');
  }
}
