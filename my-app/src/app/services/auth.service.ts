import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USER_INFO_KEY = 'userInfo';

  constructor() {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  public login(login: string, password: string): void {
    if (this.isBrowser()) {
      const fakeUserInfo = {
        login,
        password,
        token: "token"  // Обычно это реальный токен
      };
      localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(fakeUserInfo));
    }
  }

  public logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.USER_INFO_KEY);
      console.log(localStorage)
    }
  }

  public isAuthenticated(): boolean {
    if (this.isBrowser()) {
      const userInfo = localStorage.getItem(this.USER_INFO_KEY);
      return !!userInfo;
    }
    return false;
  }

  public getUserInfo(): string | null {
    if (this.isBrowser()) {
      const userInfo = localStorage.getItem(this.USER_INFO_KEY);
      return userInfo ? JSON.parse(userInfo).login : null;
    }
    return null;
  }
}
