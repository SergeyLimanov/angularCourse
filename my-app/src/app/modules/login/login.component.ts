import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";

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
  authenticated: boolean = false;


  constructor(private authService: AuthService, private router: Router) {}

  public async loginAuth() {
    try {
      await this.authService.login(this.login, this.password);

      this.authenticated = this.authService.isAuthenticated();

      if (this.authenticated) {
        this.loginEvent.emit({ login: this.login, password: this.password });
        await this.router.navigate(['/courses']);
      } else {
        console.log('Ошибка аутентификации');
      }
    } catch (error) {
      console.error('Произошла ошибка при аутентификации:', error);
    }
  }

  public resetPassword() {
    // Логика восстановления пароля
    console.log('Событие для восстановления пароля');
  }
}
