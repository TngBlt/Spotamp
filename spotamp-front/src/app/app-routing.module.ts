import { NgModule } from '@angular/core'
import { RouterModule, Routes } from "@angular/router"

import { LoginComponent } from './login/login.component'
import {DashboardComponent} from "./dashboard/dashboard.component";
import { AuthGuardService as AuthGuard} from "./auth/auth-guard.service";

const routes : Routes = [
  {path : '', redirectTo :'/dashboard', pathMatch : 'full'},
  {path: 'login', component : LoginComponent },
  {path: 'dashboard', component : DashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {enableTracing : false}
    )
  ],
  exports : [
    RouterModule
  ]
})

export class  AppRoutingModule {}
