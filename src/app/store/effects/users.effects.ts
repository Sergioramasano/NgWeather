import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {GetUsersLoadedError, GetUsersLoadedSuccess, UsersActions} from '../actions/users.actions';
import {catchError, map, mergeMap, share, switchMap, tap} from 'rxjs/operators';
import {GetUsersService} from '../../shared/services/get-users.service';
import {IUsers} from '../../shared/interfaces/users.interface';

@Injectable()
export class UsersEffects {
  @Effect()
  fetch$ = this.actions$.pipe(
    ofType(UsersActions.GetUsers),
    switchMap(() => {
      return this.usersService.getUsers().pipe(
        mergeMap((response: IUsers) => {
          return [new GetUsersLoadedSuccess(response)];
        })
      );
    }),
    share()
  );
  constructor(
    private actions$: Actions,
    private usersService: GetUsersService
  ) {}
}
