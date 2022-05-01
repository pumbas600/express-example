import { Request, Response } from 'express';

/**
 * @desc 	Get all events
 * @route 	GET /api/events/
 */
async function getEvents(req: Request, res: Response): Promise<void> {
	res.status(200).json({ message: 'Get events' });
}

/**
 * @desc 	Create a new event
 * @route 	POST /api/events/
 */
async function createEvent(req: Request, res: Response): Promise<void> {
	res.status(200).json({ message: 'Create event' });
}

/**
 * @desc 	Update an event
 * @route 	PUT /api/events/:id
 */
async function updateEvent(req: Request<{ id: string }>, res: Response): Promise<void> {
	res.status(200).json({ message: `Updating events for id ${req.params.id}` });
}

/**
 * @desc 	Delete an event
 * @route 	DELETE /api/events/:id
 */
async function deleteEvent(req: Request<{ id: string }>, res: Response): Promise<void> {
	res.status(200).json({ message: `Delete events for id ${req.params.id}` });
}

export { getEvents, createEvent, updateEvent, deleteEvent };
