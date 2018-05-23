import spotamp_config from './../routes/spotamp.config'
import * as jwt from 'jsonwebtoken'

const socketService = require("./../controllers/socketService")

let express = require('express'),
  signin = express()

const RSA_PRIVATE_KEY = spotamp_config.rsa_secure_key

signin.get('/', async (req, res) => {
  if(req.query.error) {
    console.log('Connection error : ' + req.query.error)
    socketService.io.to(req.query.state).emit("logged-refused", {type : 'error', message : 'App not allowed to connect'})
    res.send('App not allowed to connect')
  }

  const jwtToken = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: RSA_PRIVATE_KEY
  }, 'secret');

  socketService.io.to(req.query.state).emit("logged-in", {type : 'ok', message : 'App successfully logged', code: req.query.code, jwtToken : jwtToken, expiresIn: 120 })
})


export default signin
