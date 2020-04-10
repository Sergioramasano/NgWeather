import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {GetUsers} from './store/actions/users.actions';
import {IUsers} from './shared/interfaces/users.interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<IUsers>) {
  }
  ngOnInit(): void {
    this.store.dispatch(new GetUsers());
  }
}
