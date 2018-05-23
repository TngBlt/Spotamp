let express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  sourceMapSupport = require('source-map-support'),
  session = require('express-session'),
  passport = require('passport'),
  methodOverride = require('method-override'),
  socketService = require("./controllers/socketService")
import user from './routes/user.route'
import signin from './routes/signin.route'
import spotamp_config from './routes/spotamp.config'
const port = process.env.port || 3001,
  app = express(),
  http  = require('http').createServer(app),
  io = require('socket.io')(http)

socketService.init(http)

mongoose.Promise = global.Promise
mongoose.connect(spotamp_config.mongodb_dev)

sourceMapSupport.install()

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
app.use(session({
  secret: spotamp_config.api_secret.secret ,
  resave: true,
  saveUninitialized: true}));

// Endpoints
app.use('/api/user', user)
app.use('/api/connect', signin) // sign in with Spotify

app.get('/', (req,res) => {
  return res.end('Api working');
})


app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>404 : Page not Found! </h2>')
})

io.on('connect', function(socket){
  console.log('a user connected on socket : ' + socket.id);
});

http.listen(port, () => {
  console.log('SpotAmp running on port : ' + port)
})
