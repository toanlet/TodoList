import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { Todo } from './Todo'
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  list: Todo[] = [];
  currentTodo$ = new Subject();
  constructor() { }
  getTodoObs(): Observable<any> {
    return this.currentTodo$.asObservable();
  }
  setTodoObs() {
    this.currentTodo$.next();
  }
  getStore() {
    let list = localStorage.getItem('list') as string;
    return JSON.parse(list);
  }
}
