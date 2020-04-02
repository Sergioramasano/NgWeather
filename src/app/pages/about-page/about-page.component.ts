import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../redux/app.state';
import {ITodo} from '../../interfaces';
import {Observable} from "rxjs";

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  // public todos: ITodo[];
  public todoState$: Observable<ITodo>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.store.select('todoPage').subscribe(({todos}) => {
    //   this.todos = todos;
    // });

    this.todoState$ = this.store.select('todoPage');

  }

}
