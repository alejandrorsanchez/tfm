import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private snackBar: MatSnackBar) { }

  saveCredentials(body: Object): void{
    this.saveToken(body['token']);
    this.saveId(body['id']);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  saveId(id: string) {
    localStorage.setItem('id', id);
  }

  getId(): string {
    return localStorage.getItem('id');
  }

  isUserLogged(): boolean {
    return this.getToken() != null;
  }

  destroySession(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  showNotification(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000,
    });
  }
}
