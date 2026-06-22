import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  @Output() loginEvent = new EventEmitter<{ login: string, password: string }>();

  login: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  public loginAuth() {
    this.authService.login(this.login, this.password).subscribe(
      (user) => {
        // Обрабатываем результат входа и проверяем аутентификацию
        this.authService.isAuthenticated().subscribe(isAuthenticated => {
          if (isAuthenticated) {
            this.loginEvent.emit({ login: this.login, password: this.password });
            this.router.navigate(['/courses']);
          } else {
            console.log('Ошибка аутентификации');
          }
        });
      },
      (error) => {
        console.error('Произошла ошибка при аутентификации:', error);
      }
    );
  }

  public resetPassword() {
    // Логика восстановления пароля
    console.log('Событие для восстановления пароля');
  }
}
