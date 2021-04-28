import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = 'http://localhost:3000/users';
  SEARCH = '/search/';
  LOGIN = '/login';

  constructor(private http: HttpClient) { }

  save(user: User){
    return this.http.post(this.URL, user);
  }

  findById(id: string) {
    return this.http.get(this.URL + '/' + id);
  }

  findByUsername(username: string) {
    return this.http.get(this.URL + this.SEARCH + username);
  }

  getUser(user: User) {
    return this.http.post(this.URL + this.LOGIN, user, {observe: 'response'});
  }

  update(user: User) {
    return this.http.put(this.URL + '/' + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(this.URL + '/' + id);
  }
}
