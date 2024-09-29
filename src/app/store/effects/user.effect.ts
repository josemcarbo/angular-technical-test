import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import { loadUserFailure, loadUserSuccess } from '../actions/user.action';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[User] Load Users'),
      exhaustMap(() =>
        this.service.getUsersData().pipe(
          map((users) => loadUserSuccess({ users })),
          catchError((e) => of(loadUserFailure({ error: e.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: UserService) {}
}
