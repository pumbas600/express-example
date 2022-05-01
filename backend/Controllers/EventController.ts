import { Request, Response } from 'express';
import { PostEvent } from '../Types/Event';
import Status from '../Types/Status';

function isInvalidPostEvent(res: Response, postEvent: PostEvent): boolean {
	const description = postEvent.description ?? '';
	const errors: string[] = [];

	// Validate the post request - Always assume that they've entered an invalid value
	if (typeof postEvent.name !== 'string') {
		errors.push(`The name must be a string, got ${typeof postEvent.name}`);
	}
	if (typeof postEvent.location !== 'string') {
		errors.push(`The location must be a string, got ${typeof postEvent.location}`);
	}
	if (typeof description !== 'string') {
		errors.push(`The description must be a string, got ${typeof description}`);
	}

	// Check for any errors
	if (errors.length !== 0) {
		res.status(Status.BAD_REQUEST).json({ errors: errors });
		return true;
	}
	return true;
}

/**
 * @desc 	Get all events
 * @route 	GET /api/events/
 */
async function getEvents(req: Request, res: Response): Promise<void> {
	res.status(Status.OK).json({ message: 'Get events' });
}

/**
 * @desc 	Create a new event
 * @route 	POST /api/events/
 */
async function createEvent(req: Request<{}, {}, PostEvent>, res: Response): Promise<void> {
	if (isInvalidPostEvent(res, req.body)) return;

	res.status(Status.OK).json({ message: 'Create event' });
}

/**
 * @desc 	Update an event
 * @route 	PUT /api/events/:id
 */
async function updateEvent(req: Request<{ id: string }, {}, PostEvent>, res: Response): Promise<void> {
	if (isInvalidPostEvent(res, req.body)) return;

	res.status(Status.OK).json({ message: `Updating events for id ${req.params.id}` });
}

/**
 * @desc 	Delete an event
 * @route 	DELETE /api/events/:id
 */
async function deleteEvent(req: Request<{ id: string }>, res: Response): Promise<void> {
	res.status(Status.OK).json({ message: `Delete events for id ${req.params.id}` });
}

export { getEvents, createEvent, updateEvent, deleteEvent };
