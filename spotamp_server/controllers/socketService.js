const socketIo = require("socket.io")

class SocketService {

  constructor(){
    this.io = null
  }

  init(http){
    this.io = socketIo(http)
  }

}

module.exports = new SocketService()
