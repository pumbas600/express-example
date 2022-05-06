import mongoose from "mongoose";

export interface AEYBEvent {
	id: mongoose.Types.ObjectId;
	name: string;
	location: string;
	creatorId: mongoose.Types.ObjectId; // id of user who created event
	description?: string;
}

export const PostEventFields = ['name', 'location', 'description'];
// When events are created, the id and creatorId will be automatically assigned
export type PostEvent = Omit<AEYBEvent, 'id' | 'creatorId'>;
