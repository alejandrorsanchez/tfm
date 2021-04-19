import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  save(user: User){
    return this.http.post(this.url, user);
  }

  findById(id: string) {
    return this.http.get(this.url + '/' + id);
  }

  findByUsername(username: string) {
    return this.http.get(this.url + '/search/' + username);
  }

  getUser(user: User) {
    return this.http.post(this.url + '/login', user, {observe: 'response'});
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
