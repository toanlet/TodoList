import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../store.service';
import { Todo } from './../Todo'
@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss']
})
export class ListTodoComponent implements OnInit {
  @Input()
  list!: Todo[];
  searchText!: string;
  isDisplay: boolean = false;
  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.getTodoObs().subscribe(() => {
        this.list = this.storeService.list;
    })
  }
  onChecked(todo: Todo) {
    this.isDisplay = todo.isChecked;
    this.storeService.list = this.storeService.getStore();
    this.storeService.list = this.storeService.list.map(item => 
      item.id === todo.id ? { ...todo } : item
    )
    localStorage.setItem('list', JSON.stringify( this.storeService.list));
    this.storeService.setTodoObs();
  }
  removeChecked() {
    this.storeService.list = this.storeService.list.filter(todo => todo.isChecked ? false : todo);
    localStorage.setItem('list', JSON.stringify( this.storeService.list));
    this.storeService.setTodoObs();
  }
}
