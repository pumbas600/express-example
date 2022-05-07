import { Request, Response } from 'express';
import { PostEvent } from '../types/AYEBEvent';
import Status from '../types/Status';
import { EventModel } from '../models/EventModel';
import mongoose from 'mongoose';

// TODO: Test post event with random fields
// TODO: Check it's okay to leave validation to mongoose

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
async function getEvents(req: Request, res: Response) {
	const events = await EventModel.find(); // Get all events
	
	res.status(Status.OK).json(events);
}

/**
 * @desc 	Create a new event
 * @route 	POST /api/events/
 */
async function createEvent(
	req: Request<{}, {}, PostEvent>,
	res: Response
) {
	if (isInvalidPostEvent(res, req.body)) return;

	const event = await EventModel.create({
		creatorId: new mongoose.Types.ObjectId(), // TODO: Replace with actual user id
		...req.body,
	});

	res.status(Status.OK).json(event);
}

/**
 * @desc 	Update an event
 * @route 	PUT /api/events/:id
 */
async function updateEvent(
	req: Request<{ id: string }, {}, PostEvent>,
	res: Response
) {
	//if (isInvalidPostEvent(res, req.body)) return;

	const event = await EventModel.findById(req.params.id);
	if (!event) {
		res.status(Status.NOT_FOUND).json({ errors: [ `There is no event with the id ${req.params.id}` ]});
		return;
	}

	const updatedEvent = await EventModel.findByIdAndUpdate(req.params.id, req.body); // Don't allow them to create new events 

	res.status(Status.OK).json(updatedEvent);
}

/**
 * @desc 	Delete an event
 * @route 	DELETE /api/events/:id
 */
async function deleteEvent(
	req: Request<{ id: string }>,
	res: Response
) {
	const event = await EventModel.findById(req.params.id);
	if (!event) {
		res.status(Status.NOT_FOUND).json({ errors: [ `There is no event with the id ${req.params.id}` ]});
		return;
	}

	await event.remove(); // Remove the event from the database

	res.status(Status.OK).json({ id: req.params.id });
}

export { getEvents, createEvent, updateEvent, deleteEvent };
