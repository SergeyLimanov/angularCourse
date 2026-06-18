import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isAuthenticated = false;
  public currentUser: string = '';
  title = 'angular-bs';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.checkAuthentication();
  }

  private checkAuthentication(): void {
    this.authService.currentUser.pipe(
      switchMap((user) => {
        if (user) {
          this.isAuthenticated = true;
          this.currentUser = user;
          return of(user); // Возвращаем текущего пользователя для использования в `subscribe`
        } else {
          this.isAuthenticated = false;
          this.currentUser = '';
          return of(null);
        }
      }),
      switchMap(() => this.authService.getUserInfo()), // Получаем дополнительную информацию о пользователе, если нужно
      catchError((error) => {
        console.error('Ошибка при проверке аутентификации:', error);
        return of(null);
      })
    ).subscribe();
  }

  login(event: any): void {
    this.authService.login(event.login, event.password).pipe(
      switchMap(() => this.authService.currentUser), // Обновляем текущего пользователя после успешного входа
      catchError((error) => {
        console.error('Ошибка при входе:', error);
        return of(null);
      })
    ).subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.currentUser = user;
        this.router.navigate(['/courses']);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.currentUser = '';
    this.router.navigate(['/login']);
  }
}
