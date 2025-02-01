import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Types } from 'mongoose';
import { Event, IEvent} from '../models/events';
import { EventType, Status } from '../library/types';

export const validateEventFields = [
    body('eventName').isString().notEmpty().isLength({min: 3}),
    
    body('description').isString().notEmpty().isLength({min: 15}),
    
    body('eventType').custom((value) => {
        if(!Object.values(EventType).includes(value)){
            throw new Error(`Event must be of type ${Object.values(EventType).join(', ')}`);
        }
        return true
    }),
    
    body('startDate').isISO8601(),
    
    body('endDate').isISO8601().custom((endDate, { req }) => {
        const startDate = new Date(req.body.startDate);
        if(new Date(endDate) < startDate){
            throw new Error('End date must be after the starting date');
        }
        return true;
    }),
    
    body('requirements').isArray(),
    
    body('fundingNeeded').isNumeric(),
    
    body('address').isString(),

    body('status').custom((value) => {
        if(!Object.values(Status).includes(value)){
            throw new Error(`Event must have a status of ${Object.values(Status).join(', ')}`)
        }
        return true;
    }),

];

export const checkIfEventExists = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const eventName: Types.ObjectId = req.body.eventName;

        const event: IEvent | null= await Event.findOne({eventName: eventName});

        if(event != null){
            res.status(400).json({message: "This event already exists"});
            return;
        } 

    }catch(err){
        res.status(500).json({message: "ASD"});
    }
    next();
}


export const isValidLocation = async(location: any) => {
    if(!location || location.type !== 'Point'){
        return false;
    }   
    if(!Array.isArray(location.coordinates)){
        return false;
    }
    if(location.coordinates.length !== 2){
        return false;
    }

    const[longitude, latitude] = location.coordinates;
    if(longitude > 180 ||
        longitude < -180 ||
        latitude > 90 ||
        latitude < -90
    ){
        return false;
    }

    return true;

}