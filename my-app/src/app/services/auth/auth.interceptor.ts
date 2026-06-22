import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../spinner.service'; //  для спиннера
import { finalize } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);

  spinnerService.show();

  const authToken = localStorage.getItem('authToken');

  const authReq = authToken ? req.clone({
    setHeaders: { Authorization: `Bearer ${authToken}` }
  }) : req;

  return next(authReq).pipe(
    finalize(() => {
      spinnerService.hide();
    })
  );
};
