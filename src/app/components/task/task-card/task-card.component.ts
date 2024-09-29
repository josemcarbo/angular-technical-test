import { Component, Input, SimpleChange } from '@angular/core';
import { Task } from '../../../services/task/task.model';
import { removeTask, updateTask } from 'src/app/store/actions/task.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task: Task | undefined;

  constructor(private store: Store<{ task: { tasks: Task[] } }>) {}

  ngOnChange(changes: SimpleChange) {
    console.log(changes)
  }

  removeTask(id: number) {
    this.store.dispatch(removeTask({ id }));
  }

  onCheckboxChange(event: any) {
    this.store.dispatch(
      updateTask({
        task: { ...(this.task as any), completed: event.target.checked },
      })
    );
  }
}
