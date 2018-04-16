const mongoose = require('mongoose')

let users_schema = mongoose.Schema({
  first_name : String,
  last_name : String,
  username : String,
  avatar_uri : String,
  spotify_info : String, // TODO change type
  pull_requests : String // TODO change type
})


let users = mongoose.model('users', users_schema)
