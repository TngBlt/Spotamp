import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

import { Observable} from "rxjs/Observable";

import {User} from "../models/user";

@Injectable()
export class UserService {

  private readonly URL = '/api/';

  constructor(
    protected httpClient : HttpClient,
  ) { }

  public create(user: User): Observable<User> {
    return this.httpClient.post<User>(this.URL, user)
  }

  public delete(user: User): Observable<User> {
    return this.httpClient.delete<User>(`${this.URL}user/${user._id}`)
  }

  public get(username: string): Observable<User> {
    return this.httpClient.get<User>(`${this.URL}user/${username}`)
  }

  public list(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(`${this.URL}user/`);
  }

  public update(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.URL}user/${user._id}`, user);
  }

  public connect(): Observable<User> {
    return this.httpClient.get<User>(`${this.URL}connect/`);
  }

}
