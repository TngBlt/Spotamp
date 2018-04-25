export class User {
  _id : string;
  first_name: string;
  last_name : string;
  username: string;
  avatar_uri : string;
  createdAt : string;
  spotify_info : {
    profile : object,
    accessToken : string,
    refreshToken: string,
    token_expires_in : number
  };
  pull_requests :  [string] // TODO change for FK
}
