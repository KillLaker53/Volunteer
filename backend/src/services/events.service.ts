import { User, IUser} from '../models/users';
import { Event, IEvent} from '../models/events';
import { ObjectId, Types } from 'mongoose';
import { Location } from '../library/types';
import { SidebarEventDto, EventPageDto, UserEventDto } from 'types-api-volunteer/src/index';
import { formatDateRange } from '../library/utils';

export const createEventDoc = async(event: IEvent) => {
    try{

        const createdEvent: IEvent = await Event.create(event);
        
        return createdEvent;

    }catch(err){
        throw new Error("Failed to create an Event");
    }
}

export const addUserToEventHistory = async(volunteerId: string, eventId: string) => {
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
        );
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

export const getAllEventsDocs = async() => {
    try {
        const filter ={};
        const events = await Event.find(filter);

        const transformedEvents: SidebarEventDto[]  = events.map(event => ({
            _id: event.id,
            eventName: event.eventName,
            eventType: event.eventType,
            startDate: event.startDate.toISOString(),
            endDate: event.endDate.toISOString(),
            location: event.location.coordinates,
            status: event.status,
        }));

        return transformedEvents;
    } catch (err) {
        console.error("Error in getEventsDocs:", err); 
        throw new Error("Could not load events");
    }
};

export const getUserEventsDocs = async(eventIds?: ObjectId[]) => {
    if(!eventIds || eventIds.length === 0){
        return [];
    }

    try{
        const events = await Event.find({_id: {$in: eventIds}});
        
        const transformedEvents: UserEventDto[] = events.map(event => ({
            _id: event.id,
            eventName: event.eventName,
            eventType: event.eventType,
            date: formatDateRange(event.startDate, event.endDate),
            status: event.status,    
        }));
        return transformedEvents;
    }catch(err){
        throw new Error("Failed to fetch events");
    }
}

export const getEventDoc = async(eventId: string) => {
    try{
        const filter = {
            _id: eventId,
        }

        const event = await Event.findOne(filter);
        if(!event){
            throw new Error('No such event exists');
        }
        const date: string = formatDateRange(event.startDate, event.endDate);

        const transformedEvent: EventPageDto = {
            _id: event._id.toString(),
            eventName: event.eventName,
            eventType: event.eventType,
            date: date,
            address: event.address,
            description: event.description,
            requirements: event.requirements,
            funding: event.fundingNeeded,
            status: event.status
        };
        
        return transformedEvent;
    }catch(err){
        throw new Error("Could not load event")
    }
}

export const getEventName = async(eventId: string) => {
    try {
        const event = await Event.findById(eventId);
        return event?.eventName;
    } catch (error) {
        throw new Error("Error while getting the event name from the database");
    }
}

export const getDonationEventDocs = async(eventIds: string[]) => {
    try{
        const events = await Event.find({_id: {$in: eventIds}}).lean();
        return events;
    }catch(err){
        throw new Error("Error while fetching data for donations from the database")
    }
}