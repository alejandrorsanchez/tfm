import {Coordinate} from "./coordinate";

export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  description: string;
  address: string;

  constructor() {
    this.username = '';
    this.password = '';
    this.email = '';
    this.description = '';
    this.address = '';
  }

  getMyCoordinates(): Coordinate {
    let coordinate = new Coordinate();
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': this.address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        coordinate.lat = results[0].geometry.location.lat();
        coordinate.lng = results[0].geometry.location.lng();
        return coordinate;
      }
    });
    return coordinate;
  }

  copyProperties(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.description = user.description;
    this.address = user.address;
  }
}
