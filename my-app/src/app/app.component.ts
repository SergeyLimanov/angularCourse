import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {User} from "./interface/user.interface";
import {SpinnerService} from "./services/spinner.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isAuthenticated = false;
  public currentUser: string = '';
  public spinnerState$: Observable<boolean>;
  title = 'angular-bs';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly spinnerService: SpinnerService,
  ) {
    this.spinnerState$ = this.spinnerService.spinnerState$;
  }

  ngOnInit() {
    this.checkAuthentication();
  }

  private checkAuthentication(): void {
    this.authService.getCurrentUser().pipe(
      switchMap((user) => {
        if (user) {
          this.isAuthenticated = true;
          this.currentUser = `${user.firstName} ${user.lastName}`;  // Преобразуем в строку
          return of(user);
        } else {
          this.isAuthenticated = false;
          this.currentUser = '';
          return of(null);
        }

      }),
      switchMap(() => this.authService.getUserInfo()),
      catchError((error) => {
        console.error('Ошибка при проверке аутентификации:', error);
        return of(null);
      })
    ).subscribe();
  }

  login(event: any): void {
    this.authService.login(event.login, event.password).pipe(
      switchMap(() => this.authService.getCurrentUser()), // Получаем текущего пользователя после логина
      map((user: User | null) => {
        this.isAuthenticated = !!user;
        this.currentUser = user ? `${user.firstName} ${user.lastName}` : ''; // Преобразование в строку
        return user;
      }),
      catchError((error) => {
        console.error('Ошибка при входе:', error);
        return of(null);
      })
    ).subscribe(user => {
      if (user) {
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
