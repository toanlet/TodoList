import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(listTodo: any, searchValue: any): any {
    if (!searchValue) return listTodo;
    return listTodo.filter((todo:any) => todo.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
  }

}
