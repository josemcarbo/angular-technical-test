import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/services/task/task.model';
import { User } from 'src/app/services/user/user.model';
import { loadTask } from 'src/app/store/actions/task.action';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  users$: Observable<User[]> = this.store.select((state) => state.user.users);
  tasks$: Observable<Task[]> = this.store.select((state) => state.task.tasks);

  showForm: boolean = false;
  tasks: Task[] = [];
  formattedDate: string = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
    .format(new Date())
    .toString();

  constructor(
    private store: Store<{ user: { users: User[] }; task: { tasks: Task[] } }>
  ) {}

  ngOnInit() {
    this.store.dispatch(loadTask());
    
    this.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onCreateTask(): void {
    this.showForm = true;
  }

  onHideForm(): void {
    this.showForm = false;
  }
}
