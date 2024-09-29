import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../../services/user/user.model';
import { loadUser } from 'src/app/store/actions/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  users$: Observable<User[]> = this.store.select((state) => state.user.users);

  constructor(
    private store: Store<{ user: { users: User[] } }>,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(loadUser());

    this.users$.subscribe((users) => {
      if (users.length > 0) {
        this.redirect();
      }
    });
  }

  private redirect(): void {
    this.router.navigate(['tasks']);
  }
}
