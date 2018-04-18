let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let logger = require('morgan')
let mongoose = require('mongoose')
let sourceMapSupport = require('source-map-support')

import user from './routes/user.route'
import spotify_passeport from './routes/spotify_passeport.route'

const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.port || 3001

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/SpotAmp')

sourceMapSupport.install()

app.use('/api/', user)

app.use('/auth/spotify', spotify_passeport)


app.get('/', (req,res) => {
  return res.end('Api working');
})

app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>404 : Page not Found! </h2>')
})

app.listen(port, () => {
  console.log('SpotAmp running on port : ' + port)
})
