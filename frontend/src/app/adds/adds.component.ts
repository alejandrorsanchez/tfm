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

  getUser(){
    this.id = this.utilsService.getId();
    this.userService.findById(this.id).subscribe(
      (response: User) => {
        this.user = response;
      }
    );
  }

  getAdds() {
    this.addService.findByType(this.type, this.id).subscribe(
      (response: AddCreation[]) => {
        for (const key in response) {
          this.createAddFromAddCreation(response[key].userId, response[key].petId);
        }
      }
    );
  }

  createAddFromAddCreation(userId: string, petId: number) {
    this.userService.findById(userId).subscribe(
      (userResponse: User) => {
        let add = new AddListing();
        const user = new User();
        user.copyProperties(userResponse);
        add.user = user;
        if(petId){
          this.petService.findById(petId.toString()).subscribe(
            petResponse =>{
              const pet = new Pet();
              pet.copyProperties(petResponse);
              add.pet = pet;
            }
          );
        }
        this.adds.push(add);
      });
  }

  orderAddsByProximity() {
    this.myCoordinate = this.getCoordinate(this.user.address);
    this.getDistances();
    setTimeout(() => {
      this.adds.sort((add1, add2) => {
        return add1.distance - add2.distance;
      })
    }, 500);
  }

  getDistances() {
    for (const add of this.adds) {
      const coordinateOrigin = this.getCoordinate(add.user.address);
      setTimeout(() => {
        add.distance = this.getDistanceWith(coordinateOrigin);
      }, 500);
    }
  }

  getDistanceWith(coordinateOrigin: Coordinate) {
    const rad = function(x) {return x*Math.PI/180;}
    const R = 6378.137;
    const dLat = rad( coordinateOrigin.lat - this.myCoordinate.lat );
    const dLong = rad( coordinateOrigin.lng - this.myCoordinate.lng );
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(this.myCoordinate.lat)) *
      Math.cos(rad(coordinateOrigin.lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Number((R * c).toFixed(2));
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

  isAdoption() {
    return this.type == 1;
  }

  addsEmpty() {
    return this.adds.length == 0;
  }

  redirectToHome() {
    this.router.navigateByUrl('/home');
  }
}
