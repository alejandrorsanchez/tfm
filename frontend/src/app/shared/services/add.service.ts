import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AddCreation} from "../models/addCreation";
import {Observable} from "rxjs";

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

  findByType(type: number, id: string) {
    let params = new HttpParams();
    params = params.append('type', type.toString());
    params = params.append('id', id);
    return this.http.get(this.URL, {params: params});
  }

  findByUserId(userId: string) {
    return this.http.get(this.URL + '/' + userId);
  }

  delete(id: number) {
    return this.http.delete(this.URL + '/' + id);
  }
}
