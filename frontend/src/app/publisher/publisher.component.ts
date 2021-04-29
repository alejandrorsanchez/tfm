import { Component, OnInit } from '@angular/core';
import {PetService} from "../shared/pet.service";
import {UtilsService} from "../shared/utils.service";
import {Pet} from "../shared/pet";

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {

  id: string;
  myPets: any[];
  isAdoption: boolean;
  isVolunteer: boolean;

  constructor(private utilsService: UtilsService, private petService: PetService) { }

  ngOnInit(): void {
    this.myPets = [{name: 'Simba', description: 'es un perro loco al que le encanta jugar a la pelota'}, {name:'Chloe', description: 'bbb'}, {name: 'Coco', description: 'ccc'}];
    //this.myPets = [];
    this.id = this.utilsService.getId();

  }

  showAdoptionForm() {
    this.isAdoption = true;
    this.isVolunteer = false;
  }

  showVolunteerForm() {
    this.isVolunteer = true;
    this.isAdoption = false;
  }
}
