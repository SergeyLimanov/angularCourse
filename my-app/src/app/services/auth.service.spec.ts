import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../interface/user.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  const mockUsers: User[] = [
    { id: '1', token: 'token123', firstName: 'John', lastName: 'Doe', email: 'john@test.com', password: 'password' },
    { id: '2', token: 'token456', firstName: 'Jane', lastName: 'Smith', email: 'jane@test.com', password: 'pass456' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);

    const req = httpTestingController.expectOne('/api/users');
    req.flush(mockUsers);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null token initially', () => {
    expect(service.getToken()).toBeNull();
  });

  it('should set and get token', () => {
    service.setToken('test-token');
    expect(service.getToken()).toEqual('test-token');
    localStorage.removeItem('authToken');
  });

  it('should return false for isAuthenticated() when no token', (done) => {
    localStorage.removeItem('authToken');
    service.isAuthenticated().subscribe(isAuth => {
      expect(isAuth).toBeFalse();
      done();
    });
  });

  it('should return true for isAuthenticated() when token exists', (done) => {
    service.setToken('test-token');
    service.isAuthenticated().subscribe(isAuth => {
      expect(isAuth).toBeTrue();
      done();
    });
    localStorage.removeItem('authToken');
  });

  it('should login successfully with valid credentials', (done) => {
    service.login('john@test.com', 'password').subscribe(user => {
      expect(user).toBeTruthy();
      expect(user?.firstName).toEqual('John');
      expect(user?.lastName).toEqual('Doe');
      done();
    });
    const req = httpTestingController.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  });

  it('should throw error with invalid credentials', (done) => {
    service.login('wrong@test.com', 'wrongpass').subscribe({
      error: (err) => {
        expect(err).toBeTruthy();
        done();
      }
    });
    const req = httpTestingController.expectOne('/api/users');
    req.flush(mockUsers);
  });

  it('should clear token and user on logout()', () => {
    service.setToken('test-token');
    localStorage.setItem('currentUser', 'test-user');
    service.logout();
    expect(service.getToken()).toBeNull();
    expect(localStorage.getItem('currentUser')).toBeNull();
  });

  it('should return currentUser observable from getCurrentUser()', (done) => {
    service.getCurrentUser().subscribe(user => {
      expect(user).toBeNull();
      done();
    });
  });

  it('should return null from getUserInfo() when no token', (done) => {
    localStorage.removeItem('authToken');
    service.getUserInfo().subscribe(user => {
      expect(user).toBeNull();
      done();
    });
  });

  it('should return user from getUserInfo() when token matches', (done) => {
    service.setToken('token123');
    service.getUserInfo().subscribe(user => {
      expect(user).toBeTruthy();
      expect(user?.firstName).toEqual('John');
      done();
    });
    const req = httpTestingController.expectOne('/api/users');
    req.flush(mockUsers);
    localStorage.removeItem('authToken');
  });
});
