export class User {
  _id : string;
  username: string;
  avatar_uri : string;
  createdAt : string;
  spotify_info : {
    profile : object,
    access_token : string,
    refresh_token: string,
    token_expires_at : number
  };
  pull_requests :  [string] // TODO change for FK
}
