import { createReducer, on } from '@ngrx/store';
import { loadUserSuccess, loadUserFailure } from '../actions/user.action';
import { User } from 'src/app/services/user/user.model';

export interface UserState {
  users: User[];
  error: string;
}

export const initialState: UserState = {
  users: [],
  error: '',
};

export const userReducer = createReducer(
  initialState,
  on(loadUserSuccess, (state, { users }) => ({ ...state, users, error: '' })),
  on(loadUserFailure, (state, { error }) => ({ ...state, error }))
);