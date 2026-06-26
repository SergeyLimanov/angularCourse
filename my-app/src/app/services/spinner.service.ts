import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  spinnerState$: Observable<boolean> = this.spinnerSubject.asObservable();

  show(): void {
    this.spinnerSubject.next(true);
  }

  // Скрываем спиннер через секунду чтобы его было хотя бы видно
  hide(): void {
    setTimeout(() => {
      this.spinnerSubject.next(false);
    }, 200); // Задержка
  }

  runWithMinimumDelay<T>(observable: Observable<T>): Observable<T> {
    this.show();  // Показываем спиннер
    return new Observable((observer) => {
      const timeout = setTimeout(() => {
        // Гарантированно скрываем спиннер через секунду
        this.hide();
      }, 200);

      // Выполняем операцию
      observable.subscribe({
        next: (value) => observer.next(value),
        error: (err) => {
          clearTimeout(timeout); // Если ошибка, скрываем спиннер раньше
          this.hide();
          observer.error(err);
        },
        complete: () => {
          clearTimeout(timeout); // Завершаем
          this.hide();
          observer.complete();
        }
      });
    });
  }
}
