import { Request, Response, NextFunction } from 'express';
import { IEvent } from '../models/events';
import { addUserToEventHistory, approveEventDoc, createEventDoc, deleteEventDoc, getAllEventsDocs, getEventDoc, getEventsByNameDocs, getUnapprovedEventsDocs, getUserEventsDocs, removeUserFromEvent } from '../services/events.service';
import { geocodeLocation } from '../library/utils';
import { Location, Status} from '../library/types';
import { addEventToUserHistory, getUserEvents, notifyUsers } from '../services/user.service';
import { EventDto, UserEventDto } from 'types-api-volunteer/src';

export const createEvent = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const address = req.body.address;
        const location: Location = await geocodeLocation(address);
        const creatorId = res.locals.token.id;

        const eventData: IEvent = {
            creatorId: creatorId,
            eventName: req.body.eventName,
            description: req.body.description,
            eventType: req.body.eventType,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            requirements: req.body.requirements,
            fundingNeeded: req.body.fundingNeeded,
            volunteers: [],
            address: address,
            location: location,
            status: Status.On_Going,
            is_approved: false,
        }   
        const createdEvent: IEvent = await createEventDoc(eventData);
        res.status(201).json(createdEvent);
        return;
    }catch (err){
        res.status(500).json({message: "An internal server error occurred"});
    }
}

export const addVolunteerToEvent = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const volunteerId = res.locals.token.id;
        const eventId = req.body.eventId; 
        if(!volunteerId || !eventId){
            res.status(400).json({message: "Invalid add volunteer to event request"});
        }
        const updatedEvent = await addUserToEventHistory(volunteerId, eventId);
        addEventToUserHistory(volunteerId, eventId);
        res.status(201).json(updatedEvent);
        return;
    } catch(err){
        res.status(500).json({message: "An internal server error occurred"});
        return;
    }
    
}

export const removeVolunteerFromEvent = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const volunteerId = req.body.volunteerId;
        const eventId = req.params.eventId;
        if(!volunteerId || !eventId){
            res.status(400).json({message: "Invalid remove volunteer from event request"});
        }
        const updatedEvent = await removeUserFromEvent(volunteerId, eventId);
        res.status(201).json(updatedEvent);
        return;
    }catch(err){
        res.status(500).json({message: "An internal server error occurred"});
        return;
    }
}

export const getEventsHomepage = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const events = await getAllEventsDocs();
        res.status(200).json(events);
    }catch(err){
       res.status(500).json({ message: "An internal server error occurred" });
    }
};

export const getUserEventDetails = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.query.userId as string;
        if(!userId){
            res.status(400).json({message: "Invalid get user events request"});
        }
        const eventIds = await getUserEvents(userId);
        const events: UserEventDto[] = await getUserEventsDocs(eventIds);
        res.status(200).json(events);
    } catch(err){
        res.status(500).json({message: "An internal server error occurred"});
    }
}

export const getEvent = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const eventId = req.params.eventId;
        const event = await getEventDoc(eventId);
        if(!event){
            res.status(404).json({message: "Event not found"});
            return;
        } 
        res.status(200).json(event);
        return;
    }catch(err){
        res.status(500).json({message: "An internal server error occurred"});
        return;
    }

}
export const getEventsByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventName: string | undefined = req.query.eventName as string | undefined;
        if(!eventName){
            res.status(400).json({message: "Invalid get event request"});
            return;
        }
        const events = eventName
            ? await getEventsByNameDocs(eventName)
            : await getAllEventsDocs();

        if (!events || events.length === 0) {
            res.status(404).json({ message: "No events found" });
            return;
        }
        
        res.status(200).json(events);
        return;
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An internal server error occurred" });
        return;
    }
};

export const getUnapprovedEvents = async(req: Request, res: Response, next: NextFunction) => {
    try{
        
        const events: EventDto[] = await getUnapprovedEventsDocs();
        if(!events){
            res.status(404).json({message: "No events found"});
            return;
        }
        res.status(200).json(events);
        return;
    }catch(err){
        console.error(err);
        res.status(500).json({message: "An internal server error occurred"});
        return;
    }
}

export const deleteEvent = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const eventId = req.params.eventId;
        if(!eventId){
            res.status(400).json({message: "Invalid delete event request"});
        }
        await deleteEventDoc(eventId);
        res.status(200);
        return;
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'An internal server error occurred'});
        return;
    }
    
}

export const approveEvent = async(req: Request, res:Response, next: NextFunction) => {
    try{
        const eventId = req.params.eventId;
        if(!eventId){
            res.status(400).json({message: "Event Id not provided"});
        }
        const event = await approveEventDoc(eventId);
        notifyUsers(event);
     
        res.status(200);    
        return;
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'An internal server error occurred'});
        return;
    }

}