import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() loginEvent = new EventEmitter<{ login: string, password: string }>();
  login: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  loginAuth() {
    this.authService.login(this.login, this.password);
    this.loginEvent.emit({ login: this.login, password: this.password });
  }

  public resetPassword() {
    console.log('Событие для восстановления пароля');
  }
}
