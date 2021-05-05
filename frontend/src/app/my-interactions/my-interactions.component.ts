import { Component, OnInit } from '@angular/core';
import {AddService} from "../shared/add.service";
import {AddCreation} from "../shared/addCreation";
import {UtilsService} from "../shared/utils.service";
import {PetService} from "../shared/pet.service";
import {Pet} from "../shared/pet";

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

  constructor(private addService: AddService, private utilsService: UtilsService, private petService: PetService) { }

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
      if(!add.petId) return true;
    }
    return false;
  }

  addIsPet(): boolean {
    for (const add of this.myAdds) {
      if(add.petId){
        this.petId = add.petId;
        return true;
      }
    }
    return false;
  }

  openDeleteVolunteerAddDialog() {

  }

  openDeletePetAddDialog() {

  }
}
