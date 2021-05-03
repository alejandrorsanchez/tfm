import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pet} from "./pet";

@Injectable({
  providedIn: 'root'
})
export class PetService {

  URL = 'http://localhost:3000/pets';
  SEARCH = '/search/';
  FILE = '/file';

  constructor(private http: HttpClient) { }

  findById(id: string) {
    return this.http.get(this.URL + '/' + id);
  }

  findByUserId(userId: string) {
    return this.http.get(this.URL + this.SEARCH + userId);
  }

  save(pet: Pet) {
    return this.http.post(this.URL, pet);
  }

  update(pet: Pet) {
    return this.http.put(this.URL + '/' + pet.id, pet);
  }

  uploadPhoto(formData: FormData) {
    return this.http.post(this.URL + this.FILE, formData);
  }

  delete(id: number) {
    return this.http.delete(this.URL + '/' + id);
  }
}
