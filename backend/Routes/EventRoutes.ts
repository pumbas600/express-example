import { deleteEvent, getEvents } from '../Controllers/EventController';
import { Router } from 'express';

const EventRouter = Router();

EventRouter.get('/', getEvents);
EventRouter.delete('/:id', deleteEvent);

export default EventRouter;
