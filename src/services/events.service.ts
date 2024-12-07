import { User, IUser} from '../models/users';
import { Event, IEvent} from '../models/events';
import { Types } from 'mongoose';
import { Location } from '../types/types';

export const createEventDoc = async(event: IEvent) => {
    try{

        const createdEvent: IEvent = await Event.create(event);
        //notify nearby users
        return createdEvent;

    }catch(err){
        throw new Error("Failed to create an Event");
    }
}

export const getEventDoc = async(eventId: Types.ObjectId) => {
    
    try{
        const event: IEvent | null = await Event.findOne({id: eventId});
        return event;
    }catch(err){
        throw new Error("Failed to retrieve event");
    }
}

export const addUserToEvent = async(volunteerId: Types.ObjectId, eventId: Types.ObjectId) => {
    try{
        const result = await Event.updateOne(
            {_id: eventId},
            {$addToSet: {volunteers: volunteerId}}
        );

        if(result.modifiedCount > 0){
            console.log('Volunteer added');
        } else{
            console.log('Volunteer was already part of the event');
        }
        
        return result;
    }catch(err){
        throw new Error("Failed to add volunteer to the event");
    }

}

export const removeUserFromEvent = async(volunteerId: Types.ObjectId, eventId: Types.ObjectId) => {
    try{
        const result = await Event.findByIdAndUpdate(
            eventId, 
            { $pull: {volunteers: volunteerId}},
            { new: true }
        )
    }catch(err){
        throw new Error("Failed to remove volunteer to the event")
    }
}

export const findNearestEvents = async(userLocation: Location, radius: Number) => {
    
    try{
        const nearbyEvents: Array<IEvent> = await Event.find({
            location: {
                $near: {
                    $geometry: {
                        type: userLocation.type,
                        coordinates: userLocation.coordinates,
                    },
                    $maxDistance: radius,
                }
            }
        });

        return nearbyEvents;
    }catch(err){
        throw new Error("Could not load nearby events");
    }
}
