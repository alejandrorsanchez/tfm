import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Email} from "../models/email";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  URL = 'http://localhost:3000/email';

  constructor(private http: HttpClient) { }

  sendMessage(email: Email) {
    return this.http.post(this.URL, email);
  }
}
