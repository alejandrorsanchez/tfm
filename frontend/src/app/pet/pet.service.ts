import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pet} from "../shared/pet";

@Injectable({
  providedIn: 'root'
})
export class PetService {

  url = 'http://localhost:3000/pets';

  constructor(private http: HttpClient) { }

  findByUserId(userId: string) {
    return this.http.get(this.url + '/search/' + userId);
  }

  save(pet: Pet) {
    return this.http.post(this.url, pet);
  }

  update(pet: Pet) {
    return this.http.put(this.url + '/' + pet.id, pet);
  }

  uploadPhoto(formData: FormData) {
    return this.http.post(this.url + '/file', formData);
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
