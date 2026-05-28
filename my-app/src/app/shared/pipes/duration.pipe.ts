import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  /**
   * Преобразует значение в строку времени в формате "часыч минутымин"
   * @param value - значение времени в минутах
   * @returns строку времени в формате hh h mm min (пр. 1час(а) 30минут).
   * При продолжительности меньше часа возвращает только минуты
   */
  transform(value: number): string {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    if (hours > 0) {
      return `${ hours }час(а) ${ minutes }минут`;
    } else {
      return `${ minutes }минут`;
    }
  }
}
