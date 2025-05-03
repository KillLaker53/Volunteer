import { EventType, Status } from '../library/types';
import mongoose, {model, Model, Schema } from 'mongoose';
import { Location } from '../library/types';

export interface IEvent {
    creatorId: Schema.Types.ObjectId;
    eventName: string;
    description: string;
    eventType: EventType;
    startDate: Date;
    endDate: Date;
    requirements: Array<string>;
    address: string;
    location: Location;
    fundingNeeded: number;
    volunteers: Array<Schema.Types.ObjectId>;
    status: Status;
    is_approved: boolean;
}

export type EventModel = Model<IEvent>;

const EventSchema: Schema = new Schema<IEvent, EventModel>({
    creatorId: {type: Schema.Types.ObjectId, ref: 'Users'},
    eventName: {type: String},
    description: {type: String},
    eventType: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    requirements: {type: [String]},
    address: {type: String},
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
    status: {type: String},
    is_approved: {type: Boolean}
}, {collection: "Events"});

EventSchema.index({location: '2dsphere'});

export const Event: EventModel = model<IEvent, EventModel>('Event', EventSchema);