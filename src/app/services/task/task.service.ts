import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { env } from 'src/app/config/environment';
import { Task } from './task.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = env.API_URL + 'todos';

  constructor(private http: HttpClient) {}

  getTodoData(): Observable<Task[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((data) =>
        data.splice(0, 10).map((item: any) => {
          return {
            id: item.id,
            title: item.title,
            due: item.completed
              ? moment().subtract(1, 'days').format('MM/DD/YYYY')
              : moment().add(1, 'days').format('MM/DD/YYYY'),
            completed: item.completed,
            members: [],
          };
        })
      )
    );
  }
}
