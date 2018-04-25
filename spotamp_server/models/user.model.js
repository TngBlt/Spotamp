let mongoose = require('mongoose')

let User = mongoose.Schema({
  first_name: String,
  last_name : String,
  username: { type : String, required: true, unique : true},
  avatar_uri : String,
  createdAt : { type: Date, default : Date.now},
  spotify_info : {
    profile : Object,
    accessToken : String,
    refreshToken: String,
    token_expires_in : Number
  },
  pull_requests :  [String] // TODO change for FK
})


export default mongoose.model('User', User)
