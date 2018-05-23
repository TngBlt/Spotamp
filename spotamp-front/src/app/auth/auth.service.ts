import { Injectable} from "@angular/core";
import * as moment from "moment";


@Injectable()
export class AuthService {

  constructor() {}

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }


  setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.jwtToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }


}
