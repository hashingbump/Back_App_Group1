import express from 'express'
import { UserController } from '../controllers/user.controller.js'
const UserRouter = express.Router()

UserRouter.post('/login', UserController.login)
UserRouter.post('/register', UserController.register)
export { UserRouter }
