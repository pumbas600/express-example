import { Request, Response } from 'express';

async function getEvents(req: Request, res: Response): Promise<void> {
	res.status(200).json({ message: 'Get events' });
}

async function createEvent(req: Request, res: Response): Promise<void> {
	res.status(200).json({ message: 'Create event' });
}

async function deleteEvent(req: Request<{ id: string }>, res: Response): Promise<void> {
	res.status(200).json({ message: `Delete events for id ${req.params.id}` });
}

export { getEvents, deleteEvent };
