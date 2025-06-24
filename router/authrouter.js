import express from 'express'
const AuthRouter = express.Router();
// const { Signup } = require('../controller/auth')
import { Signup, Login } from "../controller/auth.js"

AuthRouter.post('/signup', Signup);
AuthRouter.post('/login', Login)

export default AuthRouter 