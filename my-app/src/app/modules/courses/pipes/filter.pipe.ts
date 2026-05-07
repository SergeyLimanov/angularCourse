import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: any[], searchText: string): any[] {
    if (!Array.isArray(array) || array.length === 0 || !searchText) {
      return array;
    }
    searchText = searchText.toLowerCase();
    return array.filter(item => {
      return item.title.toLowerCase().includes(searchText);
    });
  }

}
