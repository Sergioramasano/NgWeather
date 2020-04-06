import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../redux/app.state';
import { ITodo } from '../../interfaces';
import { Observable } from 'rxjs';
import { AddTodo } from '../../redux/todo.action';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  todoState$: Observable<any> = this.store.select('todoPage');
  // public todos: ITodo[];
  public id: number = Math.floor(Math.random() * 9999);
  public name: string;
  public ready = false;
  public todo: ITodo = {
    id: this.id,
    name: this.name,
    ready: this.ready
  };

  // public todoState$: Observable<ITodo>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store.select('todoPage').subscribe(({todos}) => {
    //   this.todos = todos;
    // });
  }

  increase() {}

  decrease() {}

  clear() {}

  addNewTodo() {
    this.store.dispatch(new AddTodo(this.todo));
    setTimeout(() => {
      this.todoState$.subscribe(r => {
        console.log(r, 'r');
      });
    }, 0);
    // console.log(this.todo);
  }
}
