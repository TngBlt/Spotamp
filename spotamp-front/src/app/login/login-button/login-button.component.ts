import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {SocketService} from "../../services/socket.service";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {User} from "../../models/user";

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css'],
  providers: [SocketService]
})
export class LoginButtonComponent implements OnInit, OnDestroy {

  private connection;
  private code;
  private user: User;

  constructor(private userService : UserService,
              private socketService : SocketService,
              private authService : AuthService,
              private router : Router) { }

  ngOnInit() {
    this.connection = this.socketService.getEventObservable('logged-in').subscribe( data => {
      this.authService.setSession(data);
      this.code = data['code'];
      this.socketService.closeAuthWindow();
      this.connection = this.userService.getCurrentUser(this.code).subscribe(user => {
        this.user = user;
        if(this.authService.isLoggedIn()) {
          this.router.navigate(['dashboard']);
        }
      });
    });

    this.connection = this.socketService.getEventObservable('logged-refused').subscribe( data => {
      console.log('Status : ' + data['message']);
      this.socketService.closeAuthWindow();
    });
  }

  onClickToLog() {
    this.socketService.openAuthWindow();
  }

  ngOnDestroy() {
    this.connection.unsubscribe()
  }
}
