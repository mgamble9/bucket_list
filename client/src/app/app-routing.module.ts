import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'index', component: LoginComponent},
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: '#user/:user_id', component:  UserComponent }

  // { path: '', pathMatch: "full", redirectTo: "/login"}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
