import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

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
    this.isAuthenticated = this.authService.isAuthenticated();
    this.currentUser = this.authService.getUserInfo() || '';
  }

  login(event: any) {
    this.authService.login(event.login, event.password);
    this.isAuthenticated = this.authService.isAuthenticated();
    this.currentUser = this.authService.getUserInfo() || '';
    if (this.isAuthenticated) {
      this.router.navigate(['/courses']);
    }
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = this.authService.isAuthenticated();
    this.currentUser = '';
    this.router.navigate(['/login']);
  }
}
