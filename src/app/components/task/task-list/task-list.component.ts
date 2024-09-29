import { Component, Input, SimpleChanges } from '@angular/core';
import { Task } from '../../../services/task/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() tasks: Task[] | undefined = [];
  filteredTasks: Task[] = [];
  filter: string = 'All';

  ngOnInit() {
    this.filteredTasks = this.tasks || [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks']) this.filteredTasks = this.tasks || [];

    this.applyFilter();
  }

  onSelectChange(event: any) {
    this.filter = event.target.value;
    this.applyFilter();
  }

  private applyFilter() {
    switch (this.filter) {
      case 'completed':
        this.filteredTasks = this.tasks?.filter((task) => task.completed) || [];
        break;
      case 'pending':
        this.filteredTasks =
          this.tasks?.filter((task) => !task.completed) || [];
        break;
      default:
        this.filteredTasks = this.tasks || [];
    }
  }
}
