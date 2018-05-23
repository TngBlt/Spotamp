import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {tap} from 'rxjs/operators'
import {User} from "../models/user";

@Injectable()
export class UserService {

  private readonly URL = '/api/user';
  private isLogged : boolean = false;
  private currentUser;
  private err;
  private code;

  constructor(
    protected httpClient : HttpClient,
  ) { }

  public create(user: User): Observable<User> {
    return this.httpClient.post<User>(this.URL, user)
  }

  public delete(user: User): Observable<User> {
    return this.httpClient.delete<User>(`${this.URL}/${user._id}`)
  }

  public get(username: string): Observable<User> {
    return this.httpClient.get<User>(`${this.URL}/${username}`)
  }

  public list(): Observable<Array<User>> {
    return this.httpClient.get<Array<User>>(`${this.URL}/all`);
  }

  public update(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.URL}/${user._id}`, user);
  }

  public getCurrentUser(code : string): Observable<User> {
    if(code != undefined){
      this.code = code;
    }
    return this.currentUser
      ? of(this.currentUser) // wrap cached value for consistent return value
      : this.httpClient.post<User>(`${this.URL}/me/`,{code: this.code}).pipe(
        tap(user => this.currentUser = user)
      );
  } // TODO mettre des fucking toPromise
}
