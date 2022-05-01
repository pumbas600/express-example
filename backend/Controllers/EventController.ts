import { Request, Response } from 'express';
import { PostEvent } from '../Types/Event';

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
async function createEvent(req: Request<{}, {}, PostEvent>, res: Response): Promise<void> {
	const description = req.body.description ?? '';
	const errors: string[] = [];

	// Validate the post request - Always assume that they've entered an invalid value
	if (typeof req.body.name !== 'string') {
		errors.push(`The name must be a string, got ${typeof req.body.name}`);
	}
	if (typeof req.body.location !== 'string') {
		errors.push(`The location must be a string, got ${typeof req.body.location}`);
	}
	if (typeof description !== 'string') {
		errors.push(`The description must be a string, got ${typeof description}`);
	}

	// Check for any errors
	if (errors.length !== 0) {
		res.status(401).json({ errors: errors });
		return;
	}

	res.status(200).json({ message: 'Create event' });
}

/**
 * @desc 	Update an event
 * @route 	PUT /api/events/:id
 */
async function updateEvent(req: Request<{ id: string }, {}, PostEvent>, res: Response): Promise<void> {
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
