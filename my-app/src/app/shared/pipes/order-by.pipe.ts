import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  /**
   * Сортирует входной массив объектов по указанному полю и порядку.
   * @param array - Входной массив для сортировки.
   * @param field - Поле, по которому должен быть отсортирован массив.
   * @param order - Порядок сортировки массива, 'asc' или 'desc'. По умолчанию 'asc'.
   * @returns Отсортированный массив.
   */
  transform(array: any[], field: string, order: 'asc' | 'desc' = 'asc'): any[] {
    // Возвращаем исходный массив, если это не массив
    if (!Array.isArray(array)) {
      return array;
    }

    // Сортируем массив на основе указанного поля и порядка
    array.sort((a: any, b: any) => {
      if (a[field] === b[field]) return 0; // Если значения равны, порядок не меняется
      return order === 'asc' ? (a[field] < b[field] ? -1 : 1) : (a[field] > b[field] ? -1 : 1);
    });

    return array;
  }

}
