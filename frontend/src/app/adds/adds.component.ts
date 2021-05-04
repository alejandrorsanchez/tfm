import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AddListing} from "../shared/addListing";
import {AddService} from "../shared/add.service";
import {UtilsService} from "../shared/utils.service";
import {UserService} from "../shared/user.service";
import {PetService} from "../shared/pet.service";
import {Pet} from "../shared/pet";
import {User} from "../shared/user";
import {Coordinate} from "./coordinate";
import TravelMode = google.maps.TravelMode;

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

  constructor(private route: ActivatedRoute, private addService: AddService, private utilsService: UtilsService,
              private userService: UserService, private petService: PetService, private router: Router) {
    this.type = this.route.snapshot.params.type;
  }

  ngOnInit(): void {
    this.getUser();
    this.getAdds();
    setTimeout(() => { this.orderAddsByProximity() }, 500);
  }

  getUser(){
    this.id = this.utilsService.getId();
    this.userService.findById(this.id).subscribe(
      response => {
        this.user = response[0];
      }
    );
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

  orderAddsByProximity() {
    const myCoordinate: Coordinate = this.getCoordinate(this.user.address);
    for (const add of this.adds) {
      const coordinateOrigin = this.getCoordinate(add.user.address);
      var origin1 = new google.maps.LatLng(coordinateOrigin.lat, coordinateOrigin.lng);
      var origin2 = this.user.address;
      var destinationA = add.user.address;
      var destinationB = new google.maps.LatLng(coordinateOrigin.lat, coordinateOrigin.lng);
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin1, origin2],
          destinations: [destinationA, destinationB],
          travelMode: TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: true,
        }, callback);

      function callback(response, status) {
        console.log(response);
      }
    }
  }

  getCoordinate(address: string): Coordinate {
    let coordinate = new Coordinate();
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        coordinate.lat = results[0].geometry.location.lat();
        coordinate.lng = results[0].geometry.location.lng();
      }
    });
    return coordinate;
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
