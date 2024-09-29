import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/services/task/task.model';
import {
  addTask,
  loadTaskFailure,
  loadTaskSuccess,
  removeTask,
  updateTask,
} from '../actions/task.action';

export interface TaskState {
  tasks: Task[];
  error: string;
}

export const initialState: TaskState = {
  tasks: [],
  error: '',
};

export const taskReducer = createReducer(
  initialState,
  on(loadTaskSuccess, (state, { tasks }) => ({ ...state, tasks, error: '' })),
  on(loadTaskFailure, (state, { error }) => ({ ...state, error })),
  on(removeTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== id),
  })),
  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [task, ...state.tasks],
  })),
  on(updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
  }))
);
