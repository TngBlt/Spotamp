import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:any;


  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.get('tanguy21b')
      .subscribe( user => {
        console.log(user);
        this.user = user;
      })

    this.userService.connect()
      .subscribe( user => {
        console.log(user);
        this.user = user;
      })
  }

}
