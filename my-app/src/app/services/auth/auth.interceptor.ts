import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  console.log('Auth Token:', authToken);

  // Если токен существует, добавляем его в заголовок
  const authReq = authToken ? req.clone({setHeaders: {Authorization: `Bearer ${authToken}`}}) : req;
  console.log('Request Headers:', authReq.headers);

  return next(authReq);
};
