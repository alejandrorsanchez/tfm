import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Comunication} from "../models/comunication";

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  URL = 'http://localhost:3000/comunications';

  constructor(private http: HttpClient) { }

  findByUserId1AndUserId2(userId1: number, userId2: number) {
    let params = new HttpParams();
    params = params.append('userId1', userId1.toString());
    params = params.append('userId2', userId2.toString());
    return this.http.get(this.URL, {params: params});
  }

  save(comunication: Comunication) {
    return this.http.post(this.URL, comunication);
  }

  update(comunication: Comunication) {
    return this.http.put(this.URL + '/' + comunication.id, comunication);
  }
}
