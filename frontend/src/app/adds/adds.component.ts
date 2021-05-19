import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AddListing} from "../shared/models/addListing";
import {AddService} from "../shared/services/add.service";
import {UtilsService} from "../shared/services/utils.service";
import {UserService} from "../shared/services/user.service";
import {PetService} from "../shared/services/pet.service";
import {Pet} from "../shared/models/pet";
import {User} from "../shared/models/user";
import {Coordinate} from "./coordinate";
import {AddCreation} from "../shared/models/addCreation";

@Component({
  selector: 'app-adds',
  templateUrl: './adds.component.html',
  styleUrls: ['./adds.component.css']
})
export class AddsComponent implements OnInit {

  type: number;
  user: User;
  adds: AddListing[] = [];
  id: string;
  myCoordinate: Coordinate;
  loaded: boolean = false;

  constructor(private route: ActivatedRoute, private addService: AddService, private utilsService: UtilsService,
              private userService: UserService, private petService: PetService, private router: Router) {
    this.type = this.route.snapshot.params.type;
  }

  ngOnInit(): void {
    this.getUser();
    this.getAdds();
    setTimeout(() => { this.orderAddsByProximity() }, 300);
    setTimeout(() => { this.loaded = true }, 800);
  }

  getUser(): void {
    this.id = this.utilsService.getId();
    this.userService.findById(this.id).subscribe(
      (response: User) => this.user = response);
  }

  getAdds(): void {
    this.addService.findByType(this.type, this.id).subscribe(
      (response: AddCreation[]) => {
        for (const addCreation of response) {
          this.createFullAddFromAddCreation(addCreation.userId, addCreation.petId);
        }
        //for (const key in response) {
          //this.createAddFromAddCreation(response[key].userId, response[key].petId);
        //}
      }
    );
  }

  createFullAddFromAddCreation(userId: string, petId: number): void {
    this.userService.findById(userId).subscribe(
      (user: User) => {
        let add = new AddListing();
        add.user = user;
        //user.copyProperties(userResponse);
        //add.user = user;
        if(petId){
          this.petService.findById(petId.toString()).subscribe(
            (pet: Pet) =>{
              add.pet = pet;
              //const pet = new Pet();
              //pet.copyProperties(petResponse);
            }
          );
        }
        this.adds.push(add);
      });
  }

  orderAddsByProximity(): void {
    this.myCoordinate = this.getCoordinate(this.user.address);
    this.getDistances();
    setTimeout(() => { this.sortAdds() }, 500);
  }

  getDistances(): void {
    for (const add of this.adds) {
      const coordinateAdd = this.getCoordinate(add.user.address);
      setTimeout(() => {
        add.distance = this.myCoordinate.getDistanceWith(coordinateAdd);
      }, 500);
    }
  }

  sortAdds(): void {
    this.adds.sort((add1, add2) => {
      return add1.distance - add2.distance;
    });
  }

  getCoordinate(address: string): Coordinate {
    let coordinate = new Coordinate();
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        coordinate.lat = results[0].geometry.location.lat();
        coordinate.lng = results[0].geometry.location.lng();
        return coordinate;
      }
    });
    return coordinate;
  }

  isAdoption(): boolean {
    return this.type == 1;
  }

  addsIsEmpty(): boolean {
    return this.adds.length == 0;
  }

  createComunication(id: number): void {
    this.router.navigate(['/home/comunications/', id, this.type]);
  }

  redirectToHome(): void {
    this.router.navigateByUrl('/home');
  }
}
