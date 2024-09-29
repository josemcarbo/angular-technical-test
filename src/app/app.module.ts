import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';
import { TaskModule } from './components/task/task.module';
import { TaskComponent } from './pages/task/task.component';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/reducers/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effect';
import { taskReducer } from './store/reducers/task.reducer';
import { TaskEffects } from './store/effects/task.effect';

@NgModule({
  declarations: [AppComponent, HomeComponent, TaskComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ user: userReducer, task: taskReducer }),
    EffectsModule.forRoot(UserEffects, TaskEffects),
    SharedModule,
    TaskModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
