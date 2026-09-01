import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { SpinnerService } from './services/spinner.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSpinnerService: jasmine.SpyObj<SpinnerService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', 
      ['getCurrentUser', 'getUserInfo', 'login', 'logout'], 
      { currentUser: of(null) }
    );
    mockAuthService.getCurrentUser.and.returnValue(of(null));
    mockAuthService.getUserInfo.and.returnValue(of(null));
    mockAuthService.login.and.returnValue(of(null));

    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

    mockSpinnerService = jasmine.createSpyObj<SpinnerService>('SpinnerService', 
      ['show', 'hide'], 
      { spinnerState$: of(false) }
    );

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: SpinnerService, useValue: mockSpinnerService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'angular-bs' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-bs');
  });

  it('should set isAuthenticated to false initially', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isAuthenticated).toBeFalse();
  });

  it('should set currentUser to empty string initially', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.currentUser).toEqual('');
  });

  it('should call logout and navigate to /login', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(app.isAuthenticated).toBeFalse();
    expect(app.currentUser).toEqual('');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
