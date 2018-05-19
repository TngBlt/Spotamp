import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {SocketService} from "../../services/socket.service";

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css'],
  providers: [SocketService]
})
export class LoginButtonComponent implements OnInit, OnDestroy {


  private user;
  private connection;

  constructor(private userService : UserService,
              private socketService : SocketService) { }

  ngOnInit() {
    this.connection = this.socketService.getEventObservable('loggedin').subscribe( user => {
      console.log('user : ' + user);
      this.socketService.closeAuthWindow();
    })
  }

  onClickToLog() {
    this.socketService.openAuthWindow();
    this.socketService.getEventObservable('loggedin').subscribe( user => {
      this.user = user;
      this.socketService.closeAuthWindow();
      console.log(this.user)
    }, error => {
      console.log(error)
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe()
  }
}
