import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/services/user/user.model';

export const loadUser = createAction('[User] Load Users');
export const loadUserSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUserFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
);