import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AddCreation} from "./addCreation";

@Injectable({
  providedIn: 'root'
})
export class AddService {

  URL = 'http://localhost:3000/adds';
  ADOPTION = '/adoption';
  VOLUNTEER = '/volunteer';

  constructor(private http: HttpClient) { }

  saveAdoptionAdd(add: AddCreation) {
    return this.http.post(this.URL + this.ADOPTION, add, {observe: 'response'});
  }

  saveVolunteerAdd(add: AddCreation) {
    return this.http.post(this.URL + this.VOLUNTEER, add, {observe: 'response'});
  }

  findByType(type: number) {
    return this.http.get(this.URL + '/' + type);
  }
}
