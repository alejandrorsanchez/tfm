import { Component, OnInit } from '@angular/core';
import {PetService} from "../shared/pet.service";
import {UtilsService} from "../shared/utils.service";
import {Pet} from "../shared/pet";
import {AddService} from "../shared/add.service";
import {AddCreation} from "../shared/addCreation";
import {Router} from "@angular/router";
import {User} from "../shared/user";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {

  id: string;
  user = new User();
  myPets: Pet[] = [];
  postingPet: Pet;
  isAdoption: boolean;
  isVolunteer: boolean;

  constructor(private utilsService: UtilsService, private petService: PetService
              , private addService: AddService, public router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();

  }

  getUser(){
    this.id = this.utilsService.getId();
    this.userService.findById(this.id).subscribe(
      response => {
        this.user = response[0];
      }
    );
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

  postAdoptionAdd() {
    const add = new AddCreation(this.id, this.postingPet.id);
    this.addService.saveAdoptionAdd(add).subscribe(
      response => {
        this.utilsService.showNotification(response.body['message']);
        this.router.navigateByUrl('/home');
      },
      error => {
        this.utilsService.showNotification(error.error['message']);
      }
    );
  }

  postVolunteerAdd() {
    const add = new AddCreation(this.id);
    this.addService.saveVolunteerAdd(add).subscribe(
      response => {
        this.utilsService.showNotification(response.body['message']);
        this.userService.update(this.user).subscribe(
          value => this.router.navigateByUrl('/home')
        );
      },
      error => {
        this.utilsService.showNotification(error.error['message']);
      }
    );
  }

  invalid(): boolean {
    return this.postingPet === undefined;
  }
}
