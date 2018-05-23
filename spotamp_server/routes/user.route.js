let express = require('express')

import * as userController from '../controllers/user.controller'

const user = express.Router()

user.route('/')
        .get(userController.getCurrentUser)
        .post(userController.addUser)
        .put(userController.updateUser)

user.route('/me/')
        .post(userController.getCurrentUser)

user.route('/all')
        .get(userController.getUsers)

user.route('/:id')
        .get(userController.getUser)
        .delete(userController.deleteUser)



export default user
