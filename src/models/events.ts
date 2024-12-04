import { EventType, Status } from '../types/types';
import mongoose, {model, Model, Schema } from 'mongoose';
import { Location } from '../types/types';

export interface IEvent {
    eventName: String;
    description: String;
    eventType: EventType;
    startDate: Date;
    endDate: Date;
    requirements: Array<String>;
    location: Location;
    fundingNeeded: Number;
    volunteers: Array<Schema.Types.ObjectId>;
    status: Status;
}

export type EventModel = Model<IEvent>;

const EventSchema: Schema = new Schema<IEvent, EventModel>({
    eventName: {type: String},
    description: {type: String},
    eventType: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    requirements: {type: [String]},
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates:{
            type: [Number],
        },
    },
    fundingNeeded: {type: Number},
    volunteers: {type: [mongoose.Schema.Types.ObjectId], ref: 'Users'},
    status: {type: String}

}, {collection: "Events"});

EventSchema.index({location: '2dsphere'});

export const Event: EventModel = model<IEvent, EventModel>('Event', EventSchema);