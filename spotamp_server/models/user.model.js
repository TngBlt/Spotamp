let mongoose = require('mongoose')

let User = mongoose.Schema({
  username: { type : String, required: true, unique : true},
  avatar_uri : String,
  createdAt : { type: Date, default : Date.now},
  spotify_info : {
    profile : Object,
    access_token : String,
    refresh_token: String,
    token_expires_at : Number
  },
  pull_requests :  [String] // TODO change for FK
})


export default mongoose.model('User', User)
