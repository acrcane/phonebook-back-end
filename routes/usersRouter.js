import express from "express"
import { userSchema } from "../schemas/usersSchemas.js"
import validateBody from "../helpers/validateBody.js"
const userRouter = express.Router()

userRouter.post('/signup', validateBody(userSchema))
userRouter.post('/login')
userRouter.post('/logout')
userRouter.get('/current')

export default userRouter