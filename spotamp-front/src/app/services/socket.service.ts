import { Injectable } from '@angular/core';
import * as io from "socket.io-client"
import {Observable} from "rxjs";

@Injectable()
export class SocketService {
  private socket;
  private user;
  private authWindow;

  constructor() {
    this.socket = io()
  }


  connect() {
    this.socket.open()
  }

  disconnect() {
    this.socket.close()
  }

  openAuthWindow() {
    this.connect();
    let authUrl = `https://accounts.spotify.com/authorize?client_id=9e37acaec39942ae9338212428659bad&response_type=code&redirect_uri=http://localhost:3001/api/connect&state=${this.socket.id}`
    this.authWindow = window.open(authUrl, "Login to Spotify","dependent=yes,chrome=yes,centerscreen=yes,width=365,height=500")
  }

  closeAuthWindow() {
    this.authWindow.close();
    this.disconnect()
  }

  emitEvent(event, data) {
    this.socket.emit(event, data)
  }

  getEventObservable(event) {
    let observable = new Observable((observer) => {

      let handler = (data) => {
        observer.next(data);
      };

      this.socket.on(event, handler);

      return () => {
        this.socket.off(event, handler);
      }

    });

    return observable
  }

}
