import { Request, Response, NextFunction } from 'express';
import { IEvent } from '../models/events';
import { addUserToEvent, createEventDoc, removeUserFromEvent } from '../services/events.service';

export const createEvent = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const eventData: IEvent = {
            eventName: req.body.eventName,
            description: req.body.eventDescription,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            eventType: req.body.eventType,
            requirements: req.body.requirements,
            fundingNeeded: req.body.fundingNeeded,
            volunteers: [],
            location: req.body.location,
            status: req.body.status
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
       
        const volunteerId = req.body.volunteerId;
        const eventId = req.body.eventId; 
        const updatedEvent = await addUserToEvent(volunteerId, eventId);
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
        const eventId = req.body.eventId;
        const updatedEvent = await removeUserFromEvent(volunteerId, eventId);
        res.status(201).json(updatedEvent);
        return;
    }catch(err){
        res.status(500).json({message: "An internal server error occurred"});
        return;
    }


}