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

  findByUsername(username: string) {
    return this.http.get(this.url + '/' + username);
  }

  getUser(user: User) {
    return this.http.post(this.url + '/login', user, {observe: 'response'});
  }
}
