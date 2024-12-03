import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private token: string | null = null;
  public errorMessage: string | null = null;

  constructor() {}

  login(token: string) {
    this.isLoggedIn = true;
    this.token = token;
    this.errorMessage = null;
  }

  logout() {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getToken(): string | null {
    return this.token;
  }
}
