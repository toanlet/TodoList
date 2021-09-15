import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(listTodo: any, ...args: unknown[]): unknown {
    const result = listTodo.map((todo: any) => {
      if (todo) {
        const d = moment({ year: todo.date.year, month: todo.date.month - 1, date: todo.date.day });
        return {...todo, dueDate: d.toDate()}
      }
      
    })
    return result.sort((a: any, b: any) => {
      return a.dueDate.getTime() - b.dueDate.getTime();
    });
  }

  

}
