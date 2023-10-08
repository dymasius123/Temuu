import express from 'express';
import historyController from '../controllers/historyController';
import authUser from '../middleware/authUser'

const historyRouter = express.Router()

historyRouter.post('/create/:eventId', authUser, historyController.joinEvent)
historyRouter.get('/read', historyController.getUserHistory);
historyRouter.delete('/user/:eventId', historyController.leaveEvent);

export default historyRouter