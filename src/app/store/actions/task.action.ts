import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/services/task/task.model';

export const loadTask = createAction('[Task] Load Tasks');
export const loadTaskSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
export const loadTaskFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: string }>()
);

export const removeTask = createAction(
  '[Task] Remove Task',
  props<{ id: number }>()
);

export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task }>()
);

export const updateTask = createAction(
  '[Task] Updated Task',
  props<{ task: Task }>()
);