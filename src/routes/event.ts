import express from 'express';
import eventController from '../controllers/eventController';
import authUser from '../middleware/authUser'
import authorizationUserIsCreator from '../middleware/authorization'

const eventRouter = express.Router()

eventRouter.get('/read', eventController.readEvents);
// eventRouter.get('/read', eventController.readByRadius); masih bingung
eventRouter.post('/create', authUser, authorizationUserIsCreator , eventController.createEvent)
eventRouter.get('/detail/:eventId', authUser, eventController.getEventDetail);
eventRouter.put('/update/:eventId', authUser, authorizationUserIsCreator, eventController.updateEvent);
eventRouter.delete('/delete/:eventId', authUser, authorizationUserIsCreator, eventController.deleteEvent);

export default eventRouter
