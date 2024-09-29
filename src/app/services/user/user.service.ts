import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { env } from 'src/app/config/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = env.API_URL + 'users';

  constructor(private http: HttpClient) { }

  getUsersData(): Observable<User[]> {
    return this.http.get<any>(this.apiUrl);
  }
}