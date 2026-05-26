import { Component } from '@angular/core';
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isAuthenticated = false;
  public currentUser: string = '';
  title = 'angular-bs';

  constructor(private readonly authService: AuthService) {}

  login(event: any) {
    this.authService.login(event.login, event.password);
    this.isAuthenticated = this.authService.isAuthenticated();
    const userInfo = this.authService.getUserInfo();
    this.currentUser = userInfo !== null ? userInfo : '';
    console.log('Выполнен вход в систему');
  }

  logout(event: any) {
    this.authService.logout();
    this.isAuthenticated = this.authService.isAuthenticated();
    this.currentUser = '';
  }
}
