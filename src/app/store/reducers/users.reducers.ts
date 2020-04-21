import {IUsers} from '../../shared/interfaces/users.interface';
import {initialState} from '../state/users.state';
import {UsersActions, UsersUnion} from '../actions/users.actions';

export function usersReducer(state: IUsers = initialState, action: UsersUnion) {
  switch (action.type) {
    case UsersActions.GetUsers:
      return {
        ...state
      };
    case UsersActions.GetUsersLoadedSuccess:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
}
