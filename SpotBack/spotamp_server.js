const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const db_url = require('./db').url
const spotamp = express()

spotamp.use(bodyParser.urlencoded({ extended: true }));

const port = 8000;

mongoose.connect(db_url)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))

db.once('open', () => {
  spotamp.listen(port, () => {
    console.log('SpotAmp démarré sur le port ' + port)
  })
})


