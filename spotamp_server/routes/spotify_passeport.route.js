let express = require('express')

import * as spotifyPasseportController from '../controllers/login.controller'

const spotify_passeport = express.Router()

spotify_passeport.route('/')
        .get(spotifyPasseportController.getAuth)
