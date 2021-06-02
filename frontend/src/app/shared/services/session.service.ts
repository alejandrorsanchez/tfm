import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

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
}
