import {IUsers} from '../../shared/interfaces/users.interface';
import {initialState} from '../state/users.state';
import {GetUsers, GetUsersLoadedError, GetUsersLoadedSuccess, UsersActions, UsersUnion} from '../actions/users.actions';

export function usersReducer(state: IUsers = initialState, action: UsersUnion) {
  switch (action.type) {
    case UsersActions.GetUsers:
      return {
        ...state
      };
    case UsersActions.GetUsersLoadedSuccess:
      console.log(action.payload, 'fefwef');
      console.log(state, 'fefwef');
      return {
        ...state,
        users: action.payload
      };
    // case UsersActions.GetUsersLoadedError:
    //   return {
    //     ...state
    //   };
    default:
      return state;
  }
}
