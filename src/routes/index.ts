import express from 'express';
import userRouter from './user';
import interestRouter from './interest';
import eventRouter from './event';
import historyRouter from './event';
const router = express.Router();

router.use('/user', userRouter)
router.use('/interest', interestRouter)
router.use('/event', eventRouter)
router.use('/history', historyRouter)


export default router