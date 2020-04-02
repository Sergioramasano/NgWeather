import {ITodo} from '../interfaces';

export interface AppState {
  todoPage: {
    todos: ITodo[]
  };
}
