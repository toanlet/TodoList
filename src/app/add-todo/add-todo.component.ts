import { StoreService } from './../store.service';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Todo } from './../Todo';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  @Input()
  todo!: Todo;
  @Input()
  title!: string;
  piorities = [
    { id: 1, title: 'Low' },
    { id: 2, title: 'Normal' },
    { id: 3, title: 'High'}
  ]
  todoForm!: FormGroup;
  constructor( private fb: FormBuilder, private storeService: StoreService) { }
 
  ngOnInit(): void {
    this.buildForm();
    if (this.todo) {
      this.todoForm.setValue(this.todo)
    }
  }
 
  buildForm() {
    const date = moment(new Date()).toObject();
    const obj = { year: date.years, month: date.months + 1, day: date.date };
    this.todoForm = this.fb.group({
      id:[null],
      title: ['', [Validators.required]],
      description: [''],
      date: [obj],
      piority: [2],
      isChecked: [false],
      dueDate:['']
    })
  }
  onSubmit() {
    if (this.todoForm.invalid) {
      return;
    }
    if (!this.title) {
      this.editTodo(this.todoForm.get('id')?.value);
    } else {
      this.addTodo();
    }
   
  }
  editTodo(id: number) {
    this.storeService.list = this.storeService.getStore();
    this.storeService.list = this.storeService.list.map(todo => 
      todo.id === id ? { ...this.todoForm.value } : todo
    )
    localStorage.setItem('list', JSON.stringify( this.storeService.list));
    this.storeService.setTodoObs();
   
  }
  addTodo() {
    const todo = { ...this.todoForm.value, id: Date.now() };
    this.storeService.list = this.storeService.getStore();
    this.storeService.list.push(todo);  
    localStorage.setItem('list', JSON.stringify(this.storeService.list));
    this.storeService.setTodoObs();
  }
}
