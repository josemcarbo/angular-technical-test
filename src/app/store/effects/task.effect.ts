import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { TaskService } from 'src/app/services/task/task.service';
import { loadTaskFailure, loadTaskSuccess } from '../actions/task.action';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Task] Load Tasks'),
      exhaustMap(() =>
        this.service.getTodoData().pipe(
          map((tasks) => loadTaskSuccess({ tasks })),
          catchError((e) => of(loadTaskFailure({ error: e.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: TaskService) {}
}
