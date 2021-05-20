import { Component, OnInit } from '@angular/core';
import {PetService} from "../shared/services/pet.service";
import {UtilsService} from "../shared/services/utils.service";
import {Pet} from "../shared/models/pet";
import {AddService} from "../shared/services/add.service";
import {AddCreation} from "../shared/models/addCreation";
import {Router} from "@angular/router";
import {User} from "../shared/models/user";
import {UserService} from "../shared/services/user.service";

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

  constructor(private utilsService: UtilsService, private petService: PetService, private addService: AddService
              , public router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.id = this.utilsService.getId();
    this.userService.findById(this.id).subscribe(
      (user: User) => this.user = user);
  }

  showAdoptionForm(): void {
    this.isAdoption = true;
    this.isVolunteer = false;
    this.getUserPets(this.id);
  }

  showVolunteerForm(): void {
    this.isVolunteer = true;
    this.isAdoption = false;
  }

  getUserPets(id: string): void {
    this.petService.findByUserId(id).subscribe(
      (response: Pet[]) => this.myPets = response
    );
  }

  selectCard(pet: Pet): void {
    this.postingPet = pet;
  }

  postAdoptionAdd(): void {
    const add = new AddCreation(this.id, this.postingPet.id);
    this.addService.saveAdoptionAdd(add).subscribe(
      response => {
        this.utilsService.showNotification(response.body['message']);
        this.router.navigateByUrl('/home');
      },
      error => this.utilsService.showNotification(error.error['message'])
    );
  }

  postVolunteerAdd(): void {
    const add = new AddCreation(this.id);
    this.addService.saveVolunteerAdd(add).subscribe(
      response => {
        this.utilsService.showNotification(response.body['message']);
        this.userService.update(this.user).subscribe(
          () => this.router.navigateByUrl('/home')
        );
      },
      error => this.utilsService.showNotification(error.error['message'])
    );
  }

  invalid(): boolean {
    return this.postingPet === undefined;
  }

  redirectToProfile(): void {
    this.router.navigateByUrl('/home/profile');
  }
}
