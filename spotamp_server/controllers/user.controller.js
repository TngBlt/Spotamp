import spotamp_conf from './../routes/spotamp.config'
let request = require('request')
let mongoose = require('mongoose')

import User from '../models/user.model'


export const getUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err) return res.json({'success' : false, 'message' : 'Error, couldn\'t get all users'})
    return res.json({'success' : true, 'message' : 'Users fetched successfully', users})
  })
}

export const addUser = (req, res) => {
  const newUser = new User(req.body)
  newUser.save((err, user) => {
    if (err) return res.json({'success' : false, 'message' : 'Error, couldn\'t add user', err})
    return res.json(user.toObject())
  })
}

export const updateUser = (req,res) => {
  console.log(req)
  User.findOneAndUpdate({ _id:req.body.id }, req.body, { new:true }, (err,user) => {
    if(err){
      return res.json({'success':false,'message':'error, couldn\'t update user','error':err});
    }
    console.log(user);
    return res.json({'success':true,'message':'Updated successfully',user});
  })
}

export const updateOrCreateUser = (req,res) => {
  User.update({_id:req.body.id},req.body, {upsert : true}, (err,user) => {
    if(err) {
      return res.json({'success': false, 'message':'coulnd\'t create or find user', 'error': err})
    }
    console.log(user)
    return res.json({'success':true, 'message': 'User found', 'user' : user})
  })
}

export const getUser = (req,res) => {
  console.log(req.params.id)
  User.findOne({username : req.params.id}).exec((err,user) => {
    if(err){
      return res.json({'success':false,'message':'Couldn\'t get the user'});
    }
    return res.json(user);
  })
}

export const deleteUser = (req,res) => {
  User.findByIdAndRemove(req.params.id, (err,user) => {
    if(err){
      return res.json({'success':false,'message':'Couldn\'t delete user'});
    }
    return res.json({'success':true,'message':user.first_name+' deleted successfully'});
  })
}

export const getCurrentUser = (req, res) => {
  console.log('Getting current user...')
  let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: req.body.code,
      redirect_uri: 'http://localhost:3001/api/connect',
      grant_type: 'authorization_code',
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(spotamp_conf.api_key + ':' + spotamp_conf.api_secret.secret).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, (err, response, body) => {
    if(!err && response.statusCode === 200) {
      let access_token = body.access_token,
        refresh_token = body.refresh_token,
        token_expires_in = body.expires_in

      let options = {
        url : 'https://api.spotify.com/v1/me',
        headers : { 'Authorization': 'Bearer ' + access_token},
        json: true
      }
      // get the current user
      request.get(options, (err, response,body)=> {
        if(!err && response.statusCode === 200) {
          let user = {username : body.id,
            avatar_uri : body.images[0].url,
            spotify_info : {
              access_token : access_token,
              refresh_token : refresh_token,
              token_expires_at : Date.now()+token_expires_in*1000}
          }

          //update or create the user
          updateSpotifyInfoUser(user).then( (user) => {
            res.json(user)
          }, (err) => {
            res.json(err)
          })
        }
        else {
          console.log(err)
        }
      })
    }
    else {
      console.log(err)
    }
  })
}

export const updateSpotifyInfoUser = (user, done) => {
  return new Promise(function (resolve, reject) {
    User.findOneAndUpdate(user.username,user,{new :true, upsert : true, setDefaultsOnInsert : true}, function (err, usr) {
      if(err)  reject(err)
      return resolve(usr)
    })
  })
}
