import mongoose, { Schema, model } from 'mongoose';
import { AEYBEvent } from '../Types/AYEBEvent';

export const EventSchema = new Schema<AEYBEvent>({
    name: {
        type: String,
        required: [true, 'You must specify an event name']
    },
    location: {
        type: String,
        required: [true, 'You must specify an event location']
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'You must specify an event creator id']
    },
    description: String,
});

export const EventModel = model('events', EventSchema);