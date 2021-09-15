import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { StoreService } from '../store.service';
import { Todo } from './../Todo'
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input()
  todo!: Todo;
  isDetail: boolean = false;
  @Output() checked = new EventEmitter<any>();
  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
  }
  detailTodo(id:number) {
    this.isDetail = true;
  }
  removeTodo(id: number) {
    this.storeService.list = this.storeService.getStore();
    const index = this.storeService.list.findIndex(todo => todo.id === id);
    this.storeService.list.splice(index, 1);
    localStorage.setItem('list', JSON.stringify(this.storeService.list));
    this.storeService.setTodoObs();
  }
  onChecked(todo: Todo, e: any) {
    this.checked.emit({...todo, isChecked: e.target.checked})
  }
}
