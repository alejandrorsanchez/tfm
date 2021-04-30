import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AddCreation} from "./addCreation";

@Injectable({
  providedIn: 'root'
})
export class AddService {

  URL = 'http://localhost:3000/adds';

  constructor(private http: HttpClient) { }

  saveAdoptionAdd(add: AddCreation) {
    return this.http.post(this.URL + '/adoption', add, {observe: 'response'});
  }

  saveVolunteerAdd(add: AddCreation) {
    return this.http.post(this.URL + '/volunteer', add, {observe: 'response'});
  }
}
