import {Action} from '@ngrx/store';
import {ITodo} from '../interfaces';

export namespace TODO_ACTION {
  export const ADD_TODO = '[ABOUT PAGE] ADD_TODO';
}

export class AddTodo implements  Action {
  readonly type = TODO_ACTION.ADD_TODO;
  constructor(public payload: ITodo) {
  }
}
