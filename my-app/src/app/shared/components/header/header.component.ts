import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  @Output() public logoutEvent: EventEmitter<Event> = new EventEmitter<Event>();
  @Input() public isAuthenticated = false;
  @Input() public currentUser = "";
  constructor(private readonly authService: AuthService) { }

  public logout() {
    console.log(`Выход ${this.currentUser}`);
    this.authService.logout();
    this.logoutEvent.emit();
  }
}
