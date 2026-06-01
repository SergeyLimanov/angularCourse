import { Pipe, PipeTransform } from '@angular/core';
import {Course} from "../../../interface/course.interface";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /**
   * Фильтрует массив курсов по полю title с учётом регистра.
   * @param courses - массив курсов
   * @param searchField - строка для поиска по полю title
   * @returns отфильтрованный массив курсов
   */
  transform(courses: Course[], searchField: string): Course[] {
    if (!searchField) {
      return courses;
    }
    // Фильтруем курсы по полю title с учётом регистра
    return courses.filter(course => course.title.toLowerCase().includes(searchField.toLowerCase()));
  }

}
