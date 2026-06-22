import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../interface/user.interface";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  @Output() public logoutEvent: EventEmitter<Event> = new EventEmitter<Event>();
  @Input() public isAuthenticated = false;
  @Input() public currentUser = "";  // Объявление входного свойства
  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user: User | null) => {
      this.isAuthenticated = !!user;
      if (user) {
        this.currentUser = `${user.firstName} ${user.lastName}`; // Формируем строку
      } else {
        this.currentUser = '';
      }
    });
  }

  public logout() {
    console.log(`Выход ${this.currentUser ? this.currentUser : 'неизвестный пользователь'}`);
    this.authService.logout();
    this.logoutEvent.emit();
  }
}
