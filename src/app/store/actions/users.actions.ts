import {Action} from '@ngrx/store';
import {IUsers} from '../../shared/interfaces/users.interface';

export enum UsersActions {
  GetUsers = '[Users Page] GetUsers',
  GetUsersLoadedSuccess = '[Users Success] UsersLoadedSuccess',
  GetUsersLoadedError = '[Users Page] UsersLoadedError'
}

export class GetUsers implements Action {
  readonly type = UsersActions.GetUsers;
}

export class GetUsersLoadedSuccess implements Action {
  readonly type = UsersActions.GetUsersLoadedSuccess;

  constructor(public payload: IUsers) {}
}

export class GetUsersLoadedError implements Action {
  readonly type = UsersActions.GetUsersLoadedError;
}

// Смешанный тип
export type UsersUnion = GetUsers | GetUsersLoadedSuccess | GetUsersLoadedError;
