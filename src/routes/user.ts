import express from 'express';
import userController from '../controllers/userController';
import authUser from '../middleware/authUser'
const userRouter = express.Router()

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)
userRouter.patch('/is_verified', authUser, userController.updateVerified)
userRouter.patch('/role', authUser, userController.updateRole)
userRouter.patch('/type', authUser, userController.updateType)

export default userRouter