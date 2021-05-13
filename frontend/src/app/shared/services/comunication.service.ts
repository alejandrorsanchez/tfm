import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  URL = 'http://localhost:3000/comunications';

  constructor(private http: HttpClient) { }

  findByBothUserId(userId1: number, userId2: number) {
    let params = new HttpParams();
    params = params.append('userId1', userId1.toString());
    params = params.append('userId2', userId2.toString());
    return this.http.get(this.URL, {params: params});
  }
}
