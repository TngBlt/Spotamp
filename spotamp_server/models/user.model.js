let mongoose = require('mongoose')

let User = mongoose.Schema({
  first_name: String,
  last_name : String,
  username: String,
  avatar_uri : String,
  createdAt : { type: Date, default : Date.now},
  spotify_info : String, // TODO change for FK
  pull_requests :  [String] // TODO change for FK
})

export default mongoose.model('User', User)
