import {createFeatureSelector, createSelector, State} from '@ngrx/store';
import {IUser, IUsers} from '../../shared/interfaces/users.interface';
export const selectUsers = createFeatureSelector('users');

export const selectUsersList = createSelector(selectUsers, (state: IUsers) => {
  return  state.users;
});
