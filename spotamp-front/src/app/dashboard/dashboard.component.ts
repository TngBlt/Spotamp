import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser;

  constructor(private userService : UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser(undefined).subscribe((user) => {
      this.currentUser = user;
    });
  }

}
