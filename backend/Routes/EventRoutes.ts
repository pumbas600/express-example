import { createEvent, deleteEvent, getEvents, updateEvent } from '../Controllers/EventController';
import { Router } from 'express';

const EventRouter = Router();

EventRouter.route('/').get(getEvents).post(createEvent);
EventRouter.route('/:id').put(updateEvent).delete(deleteEvent);

export default EventRouter;
