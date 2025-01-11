import { Request, Response, NextFunction } from 'express';
import { IEvent } from '../models/events';
import { addUserToEvent, createEventDoc, getEventDoc, getEventsDocs, removeUserFromEvent } from '../services/events.service';
import { geocodeLocation } from '../library/utils';
import { Location } from '../types/types';

export const createEvent = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const address = req.body.address;
        const location: Location = await geocodeLocation(address);

        const eventData: IEvent = {
            eventName: req.body.eventName,
            description: req.body.eventDescription,
            eventType: req.body.eventType,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            requirements: req.body.requirements,
            fundingNeeded: req.body.fundingNeeded,
            volunteers: [],
            address: address,
            location: location,
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
        const volunteerId = req.body.userId;
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

export const getEvents = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const events = await getEventsDocs();
        res.status(200).json(events);
    }catch(err){
        res.status(500).json({message: "An internal server error occurred"});
        return;
    }
}

export const getEvent = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const eventId = req.query.eventId as string;
        if(!eventId){
            res.status(404).json({message: "Missing required query parameter: eventId"});
        }
        const event = await getEventDoc(eventId);
        
        res.status(200).json(event);
        return;
    }catch(err){
        res.status(500).json({message: "An internal server error occurred"});
        return;
    }

}