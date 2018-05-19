import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { AppRoutingModule } from "./app-routing.module"
import { UserService } from './services/user.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginButtonComponent } from './login/login-button/login-button.component'
import {SocketService} from "./services/socket.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LoginButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
