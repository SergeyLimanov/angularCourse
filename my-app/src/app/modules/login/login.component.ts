import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

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

  public onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.login, this.password).subscribe(
        (user) => {
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
  }

  public resetPassword() {
    console.log('Событие для восстановления пароля');
  }
}
