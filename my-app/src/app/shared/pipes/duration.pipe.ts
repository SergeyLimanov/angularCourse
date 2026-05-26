import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(durationInMinutes: number): string {
    if (durationInMinutes < 60) {
      return `${durationInMinutes} мин`;
    } else {
      const hours = Math.floor(durationInMinutes / 60);
      const minutes = durationInMinutes % 60;
      return `${hours} ч ${minutes} мин`;
    }
  }

}
