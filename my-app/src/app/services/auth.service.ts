import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<string | null>(
    this.isBrowser() ? localStorage.getItem('currentUser') : null
  );
  private usersUrl = "/api/users";
  private coursesUrl = "/api/courses";


  public currentUser: Observable<string | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

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

  public login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map((users) => {
        const user = users.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          this.currentUserSubject.next(user.email);
          localStorage.setItem("currentUser", user.email);
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
    console.log("Выход " + this.currentUserSubject.value);
    this.currentUserSubject.next(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
  }

  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  public getCurrentUser(): string | null {
    return this.currentUserSubject.value;
  }

  public getUserInfo(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return of(null); // Возвращаем пустое значение, если токен отсутствует
    }
    return this.http.get<any[]>(this.usersUrl).pipe(
      map((users) => {
        const user = users.find((user) => user.token === token);
        return user ? { email: user.email, firstName: user.firstName, lastName: user.lastName } : null;
      }),
      catchError((error) => {
        console.error("Ошибка при получении информации о пользователе:", error);
        return of(null);
      })
    );
  }

  private isBrowser() {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
}
