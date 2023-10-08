import express from 'express';
import interestController from '../controllers/interestController';
const interestRouter = express.Router()

interestRouter.post('/create', interestController.createInterest)
interestRouter.get('/read', interestController.readInterest)
interestRouter.get('/read/:id', interestController.readDetailInterest)
interestRouter.put('/update/:id', interestController.updateInterest)
interestRouter.delete('/delete/:id', interestController.deleteInterest)

export default interestRouter