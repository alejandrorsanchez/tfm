import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PetService {

  url = 'http://localhost:3000/pets';

  constructor(private http: HttpClient) { }

  findByUserId(userId: string) {
    return this.http.get(this.url + '/search/' + userId);
  }
}
