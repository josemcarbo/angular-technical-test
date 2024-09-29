import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Task } from 'src/app/services/task/task.model';
import { addTask } from 'src/app/store/actions/task.action';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  @Input() task: Task | undefined;
  @Output() onClose = new EventEmitter<void>();

  tasks$: Observable<Task[]> = this.store.select((state) => state.task.tasks);
  lastId: number = 0;
  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    due: new FormControl(moment().format('YYYY-MM-DD'), [
      Validators.required,
      Validators.pattern(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/),
    ]),
    members: new FormArray(
      [
        new FormGroup({
          fullName: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
          ]),
          age: new FormControl('', [Validators.required, Validators.min(18)]),
          skills: new FormArray(
            [
              new FormGroup({
                name: new FormControl('', [
                  Validators.required,
                  Validators.minLength(3),
                ]),
              }),
            ],
            [this.minLengthArray(1), this.notRepeatValue('name')]
          ),
        }),
      ],
      [this.minLengthArray(1), this.notRepeatValue('fullName')]
    ),
  });

  constructor(private store: Store<{ task: { tasks: Task[] } }>) {}

  ngOnInit() {
    this.tasks$.subscribe((tasks) => {
      console.log({ tasks });
      const tmp = tasks.map((task) => task.id);
      this.lastId = tmp.length ? tmp.reverse()[0] : 0;
    });
  }

  get title() {
    return this.form.get('title');
  }

  get due() {
    return this.form.get('due');
  }

  get members(): FormArray {
    return this.form.get('members') as FormArray;
  }

  skills(index: number) {
    return this.members.at(index).get('skills') as FormArray;
  }

  addMember() {
    this.members.push(
      new FormGroup({
        fullName: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        age: new FormControl('', [Validators.required, Validators.min(18)]),
        skills: new FormArray(
          [
            new FormGroup({
              name: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
              ]),
            }),
          ],
          [this.minLengthArray(1), this.notRepeatValue('name')]
        ),
      })
    );
  }

  removeMember(i: number) {
    this.members.removeAt(i);
  }

  addSkill(i: number) {
    this.skills(i).push(
      new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
      })
    );
  }

  removeSkill(i: number, j: number) {
    this.skills(i).removeAt(j);
  }

  updateProfile() {
    console.log('updateProfile');
  }

  onSubmit() {
    console.log('onSubmit', this.form.value);

    this.store.dispatch(addTask({ task: this.transformTask(this.form.value) }));
    this.onCancel();
  }

  onCancel() {
    this.form.reset();
    this.onClose.emit();
  }

  private minLengthArray(min: number): any {
    return (formArray: FormArray) => {
      return formArray.length >= min ? null : { minLengthArray: true };
    };
  }

  private notRepeatValue(key: string): any {
    return (formArray: FormArray) => {
      let values = formArray.controls.map((control) => control.get(key)?.value);
      values = [...new Set(values)];
      return formArray.length === values.length
        ? null
        : { notRepeatValue: true };
    };
  }

  private transformTask(data: any): Task {
    console.log({ id: this.lastId });

    return {
      id: this.lastId + 1,
      title: data.title,
      due: data.due,
      completed: data.completed,
      members: data.members.map((member: any) => {
        return {
          fullName: member.fullName,
          age: member.age,
          skills: member.skills.map((skill: any) => skill.name),
        };
      }),
    };
  }
}
