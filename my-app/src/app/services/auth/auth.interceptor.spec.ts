import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { of } from 'rxjs';

import { authInterceptor } from './auth.interceptor';
import { SpinnerService } from '../spinner.service';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  let mockSpinnerService: jasmine.SpyObj<SpinnerService>;

  beforeEach(() => {
    mockSpinnerService = jasmine.createSpyObj<SpinnerService>('SpinnerService', ['show', 'hide']);
    localStorage.removeItem('authToken');

    TestBed.configureTestingModule({
      providers: [
        { provide: SpinnerService, useValue: mockSpinnerService },
      ],
    });
  });

  afterEach(() => {
    localStorage.removeItem('authToken');
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should call spinnerService.show()', () => {
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = () => of({} as any);
    interceptor(req, next).subscribe();
    expect(mockSpinnerService.show).toHaveBeenCalled();
  });

  it('should call spinnerService.hide() on finalize', () => {
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = () => of({} as any);
    interceptor(req, next).subscribe();
    expect(mockSpinnerService.hide).toHaveBeenCalled();
  });

  it('should add Authorization header when token exists', () => {
    localStorage.setItem('authToken', 'test-token');
    const req = new HttpRequest('GET', '/test');
    let capturedReq: HttpRequest<any> | undefined;
    const next: HttpHandlerFn = (r) => { capturedReq = r; return of({} as any); };
    interceptor(req, next).subscribe();
    expect(capturedReq!.headers.get('Authorization')).toBe('Bearer test-token');
  });

  it('should not add Authorization header when no token', () => {
    const req = new HttpRequest('GET', '/test');
    let capturedReq: HttpRequest<any> | undefined;
    const next: HttpHandlerFn = (r) => { capturedReq = r; return of({} as any); };
    interceptor(req, next).subscribe();
    expect(capturedReq!.headers.get('Authorization')).toBeNull();
  });
});
