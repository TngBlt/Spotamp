const SocketIo = require("socket.io")

let express = require('express'),
  signin = express()

const http = require('http').createServer(signin)
const io = SocketIo(http)

signin.get('/', async (req, res) => {
    if(req.query.error) {
      console.log('Connection error : ' + req.query.error)
      res.send('App not allowed to connect')
    }
    console.log(req.query.state);
    io.to(req.query.state).emit("loggedin", 'test')
    res.send('Successfully logged in')
  })


export default signin
