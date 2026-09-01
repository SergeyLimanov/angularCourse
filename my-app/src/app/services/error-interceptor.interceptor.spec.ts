import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { errorInterceptor } from './error-interceptor.interceptor';
import { MessageService } from 'primeng/api';

describe('errorInterceptorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => errorInterceptor(req, next));

  let mockMessageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj<MessageService>('MessageService', ['add']);

    TestBed.configureTestingModule({
      providers: [
        { provide: MessageService, useValue: mockMessageService },
      ],
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should pass through on success', (done) => {
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandlerFn = () => of({} as any);
    interceptor(req, next).subscribe({
      next: () => {
        expect(mockMessageService.add).not.toHaveBeenCalled();
        done();
      }
    });
  });

  it('should call messageService.add and rethrow on error', (done) => {
    const req = new HttpRequest('GET', '/test');
    const errorResponse = new HttpErrorResponse({ status: 500, statusText: 'Server Error', url: '/test' });
    const next: HttpHandlerFn = () => throwError(() => errorResponse);
    interceptor(req, next).subscribe({
      error: (err) => {
        expect(mockMessageService.add).toHaveBeenCalledWith({
          severity: 'error',
          summary: 'Error 500',
          detail: errorResponse.message
        });
        expect(err).toBe(errorResponse);
        done();
      }
    });
  });
});
