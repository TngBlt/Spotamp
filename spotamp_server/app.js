let express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  sourceMapSupport = require('source-map-support'),
  session = require('express-session'),
  passport = require('passport'),
  methodOverride = require('method-override'),
  SpotifyStrategy = require('passport-spotify').Strategy


import user from './routes/user.route'
import spotamp_config from './routes/spotamp.config'
const app = express()

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SpotifyStrategy({
    clientID: spotamp_config.api_key,
    clientSecret: spotamp_config.api_secret.secret,
    callbackURL: 'http://localhost:3001/callback/'
  },
  function(accessToken, refreshToken, expires_in, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's spotify profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the spotify account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }));



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride());

const port = process.env.port || 3001

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/SpotAmp')

sourceMapSupport.install()

app.use('/api/', user)

app.use(session({
  secret: spotamp_config.api_secret.secret ,
  resave: true,
  saveUninitialized: true}));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req,res) => {
  return res.end('Api working');
})

app.get('/auth/spotify',
  passport.authenticate('spotify', {scope: spotamp_config.scopes, showDialog: true}),
  function(req, res){
// The request will be redirected to spotify for authentication, so this
// function will not be called.
  });

app.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/'); // TODO redirect to home page
  });

app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>404 : Page not Found! </h2>')
})

app.listen(port, () => {
  console.log('SpotAmp running on port : ' + port)
})
