import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Add} from "./add";

@Injectable({
  providedIn: 'root'
})
export class AddService {

  URL = 'http://localhost:3000/adds';

  constructor(private http: HttpClient) { }

  saveAdoptionAdd(add: Add) {
    return this.http.post(this.URL + '/adoption', add, {observe: 'response'});
  }

  saveVolunteerAdd(add: Add) {
    return this.http.post(this.URL + '/volunteer', add, {observe: 'response'});
  }
}
