export interface Event {
	id: string;
	name: string;
	location: string;
	creatorId: string; // id of user who created event
	description?: string;
}

// When events are created, the id and creatorId will be automatically assigned
export type PostEvent = Omit<Event, 'id' | 'creatorId'>;
