import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USER_INFO_KEY = 'userInfo';

  constructor() {}

  public login(login: string, password: string): void {
    const fakeUserInfo = {
      login,
      password,
      token: "token"  // Обычно это реальный токен
    };

    // Сохраняем объект в localStorage
    localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(fakeUserInfo));
  }

  public logout(): void {
    // Удаляем информацию о пользователе
    localStorage.removeItem(this.USER_INFO_KEY);
  }

  public isAuthenticated(): boolean {
    // Проверяем наличие данных о пользователе в localStorage
    const userInfo = localStorage.getItem(this.USER_INFO_KEY);
    return !!userInfo;
  }

  public getUserInfo(): string | null {
    // Извлекаем информацию о пользователе
    const userInfo = localStorage.getItem(this.USER_INFO_KEY);
    return userInfo ? JSON.parse(userInfo).login : null;
  }
}
