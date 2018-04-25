import spotamp_config from './spotamp.config'
import * as userController from '../controllers/user.controller'

let passport = require('passport'),
  SpotifyStrategy = require('passport-spotify').Strategy,
  express = require('express'),
  signin = express.Router()



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SpotifyStrategy({
    clientID: spotamp_config.api_key,
    clientSecret: spotamp_config.api_secret.secret,
    callbackURL: 'http://localhost:3001/api/connect/success'
  },
  function(accessToken, refreshToken, expires_in, profile, done) {
    let user = {
      accessToken : accessToken,
      refreshToken : refreshToken,
      token_expires_in : expires_in,
      profile : profile
    }
    let new_user = userController.updateSpotifyInfoUser(user, done)
    new_user.then( (user, err) => {
      return done(err, user)
    })
  }));

signin.route('/')
  .get(passport.authenticate('spotify', {scope: ['user-read-email',
      'user-read-private',
      'playlist-read-private',
      'playlist-read-collaborative',
      'playlist-modify-public',
      'playlist-modify-private',
    ], showDialog: false}), ()=>{},
  function(req, res){})

signin.route('/success')
  .get(passport.authenticate('spotify'),
  function(req, res) {
    console.log(req.user)
    res.json(req.user) // TODO return json user
  })

export default signin
