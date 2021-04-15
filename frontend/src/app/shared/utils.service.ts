import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

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

}
