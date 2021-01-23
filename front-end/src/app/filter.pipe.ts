import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): unknown {
    // console.log(items, searchText);
    
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    if(searchText == 'reducing') {
      return items.filter(it => {
        return it.is_reducing == true;
      })
    } 
    // if(searchText in ['all', 'unik', 'acg unik', 'acg isi'])
    else if(searchText == 'all' || searchText == 'unik' || searchText == 'acg unik' || searchText == 'acg isi') {
      return items.filter(it => {
        return it.category.toLowerCase()== searchText;
      });
    }
    else {
      return items.filter(it => {
        it.name = it.name.toLocaleLowerCase()
        return it.name.includes(searchText)
      })
    }
  }
}
