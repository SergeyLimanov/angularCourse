import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import {User} from "../interface/user.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private usersUrl = "/api/users";
  private coursesUrl = "/api/courses";
  public currentUser: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getUserInfo().subscribe(user => this.currentUserSubject.next(user));
  }

  // Метод для получения текущего токена из localStorage
  public getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('authToken') : null;
  }

  // Метод для установки токена после аутентификации
  public setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('authToken', token);
    }
  }


  public login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map((users) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          this.currentUserSubject.next(user);  // Сохраняем объект User
          localStorage.setItem("currentUser", JSON.stringify(user)); // Сохраняем объект User
          this.setToken(user.token);  // Устанавливаем токен
          return user;
        } else {
          throw new Error("Неверный логин или пароль");
        }
      }),
      catchError((error) => {
        console.error("Ошибка при входе:", error);
        return throwError(error);
      })
    );
  }

  public logout(): void {
    console.log("Выход пользователя " + (this.currentUserSubject.value?.email || "неизвестно"));
    this.currentUserSubject.next(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
  }

  // Метод для проверки аутентификации
  public isAuthenticated(): Observable<boolean> {
    const token = this.getToken();
    return of(!!token); // Возвращаем Observable<boolean>
  }

  public getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  public getUserInfo(): Observable<User | null> {
    const token = this.getToken();
    if (!token) {
      return of(null);
    }
    return this.http.get<User[]>(this.usersUrl).pipe(
      map(users => {
        const user = users.find(u => u.token === token);
        return user || null;
      }),
      catchError(error => {
        console.error('Ошибка при получении информации о пользователе:', error);
        return of(null);
      })
    );
  }

// Проверяем наличие доступа к window и localStorage
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
}
