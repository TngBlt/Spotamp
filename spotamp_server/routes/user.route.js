let express = require('express')

import * as userController from '../controllers/user.controller'

const user = express.Router()

user.route('/')
        .get(userController.getUsers)
        .post(userController.addUser)
        .put(userController.updateUser)

user.route('/:id')
        .get(userController.getUser)
        .delete(userController.deleteUser)


export default user
