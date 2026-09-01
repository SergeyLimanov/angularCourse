import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj<AuthService>('AuthService',
      ['login', 'isAuthenticated'],
      { currentUser: of(null) }
    );
    mockAuthService.login.and.returnValue(of({ id: '1', token: 'token', firstName: 'Test', lastName: 'User', email: 'test@test.com', password: 'pass' }));
    mockAuthService.isAuthenticated.and.returnValue(of(true));

    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty login and password initially', () => {
    expect(component.login).toEqual('');
    expect(component.password).toEqual('');
  });

  it('should emit loginEvent on successful submit', () => {
    spyOn(component.loginEvent, 'emit');
    component.login = 'test@test.com';
    component.password = 'password';

    const mockForm = { valid: true } as any;
    component.onSubmit(mockForm);

    expect(mockAuthService.login).toHaveBeenCalledWith('test@test.com', 'password');
  });

  it('should not call authService.login when form is invalid', () => {
    const mockForm = { valid: false } as any;
    component.onSubmit(mockForm);
    expect(mockAuthService.login).not.toHaveBeenCalled();
  });

  it('should call resetPassword and log message', () => {
    spyOn(console, 'log');
    component.resetPassword();
    expect(console.log).toHaveBeenCalledWith('Событие для восстановления пароля');
  });
});
