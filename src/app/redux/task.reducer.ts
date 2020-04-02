import {AddTodo, TODO_ACTION} from './todo.action';

const initialState = {
  todos: [{
    id: 1,
    name: 'Hello',
    ready: false
  }]
};

export function todosReducer(state = initialState, action: AddTodo) {
  switch (action.type) {
    case TODO_ACTION.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    default:
      return state;
  }

}
