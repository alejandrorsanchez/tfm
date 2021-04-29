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
  myPets: Pet[] = [];
  postingPet: Pet;
  isAdoption: boolean;
  isVolunteer: boolean;

  constructor(private utilsService: UtilsService, private petService: PetService) { }

  ngOnInit(): void {
    this.id = this.utilsService.getId();

  }

  showAdoptionForm() {
    this.isAdoption = true;
    this.isVolunteer = false;
    this.getUserPets(this.id);
  }

  showVolunteerForm() {
    this.isVolunteer = true;
    this.isAdoption = false;
  }

  getUserPets(id: string) {
    this.petService.findByUserId(id).subscribe(
      response => {
        this.myPets = [];
        for (const key in response) {
          let pet = new Pet();
          pet.copyProperties(response[key]);
          this.myPets.push(pet);
        }
      }
    );
  }

  selectCard(pet: Pet) {
    this.postingPet = pet;
  }

  postAdd() {
    //TODO
  }

  invalid(): boolean {
    return this.postingPet === undefined;
  }
}
