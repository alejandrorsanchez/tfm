import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AddListing} from "../shared/addListing";
import {AddService} from "../shared/add.service";
import {UtilsService} from "../shared/utils.service";
import {UserService} from "../shared/user.service";
import {PetService} from "../shared/pet.service";
import {Pet} from "../shared/pet";
import {User} from "../shared/user";

@Component({
  selector: 'app-adds',
  templateUrl: './adds.component.html',
  styleUrls: ['./adds.component.css']
})
export class AddsComponent implements OnInit {

  type: number;
  adds: AddListing[] = [];
  id: string;

  constructor(private route: ActivatedRoute, private addService: AddService, private utilsService: UtilsService,
              private userService: UserService, private petService: PetService, private router: Router) {
    this.type = this.route.snapshot.params.type;
  }

  ngOnInit(): void {
    this.id = this.utilsService.getId();
    this.getAdds();
    console.log(this.adds);
  }

  getAdds() {
    this.addService.findByType(this.type, this.id).subscribe(
      response => {
        for (const key in response) {
          this.createAddFromResponse(response[key].userId, response[key].petId);
        }
      }
    );
  }

  createAddFromResponse(userId: string, petId: number) {
    let add = new AddListing();
    this.userService.findById(userId).subscribe(
      userResponse => {
        const user = new User();
        user.copyProperties(userResponse[0]);
        add.user = user;
        this.petService.findById(petId.toString()).subscribe(
          petResponse =>{
            const pet = new Pet();
            pet.copyProperties(petResponse[0]);
            add.pet = pet;
            this.adds.push(add);
          }
        );
      });
  }

  isAdoption() {
    return this.type == 1;
  }

  addsNotExist() {
    return this.adds.length == 0;
  }

  redirectToHome() {
    this.router.navigateByUrl('/home');
  }
}
