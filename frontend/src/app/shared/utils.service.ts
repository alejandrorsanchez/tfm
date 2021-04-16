import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private snackBar: MatSnackBar) { }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  isUserLogged(): boolean {
    return this.getToken() != null;
  }

  destroySession(): void{
    localStorage.removeItem('token');
  }

  showNotification(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000,
    });
  }
}
