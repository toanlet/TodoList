import { Component, OnInit } from '@angular/core';
import { NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { StoreService } from './store.service';
import { Todo } from './Todo';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'New To Do';
  listTodo : Todo[] = []
  constructor(private config: NgbDatepickerConfig, private storeService: StoreService) {
    const current = new Date();
    config.minDate = { year: current.getFullYear(), month: 
    current.getMonth() + 1, day: current.getDate() };
    
  }
  ngOnInit(): void {
    if (localStorage.getItem('list')) {
      this.listTodo = this.storeService.getStore();
      this.storeService.getTodoObs().subscribe(() => {
        this.listTodo = this.storeService.list;
      })
       
    } else {
      localStorage.setItem('list', JSON.stringify(this.storeService.list));
    }
    
  }
  
 
}
