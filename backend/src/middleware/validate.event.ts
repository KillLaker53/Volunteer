import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { HydratedDocument, Types } from 'mongoose';
import { Event, IEvent} from '../models/events';
import { EventType, Status } from '../library/types';

export const validateEventFields = [
    body('eventName').notEmpty().isString().isLength({min: 3}),
    
    body('description').notEmpty().isString().isLength({min: 15}),
    
    body('eventType').custom((value) => {
        return validateEventType(value);
    }),
    
    body('startDate').notEmpty().isISO8601(),
    
    body('endDate').notEmpty().isISO8601().custom((endDate, { req }) => {
        return validateEndDate(new Date(req.body.startDate), new Date(endDate));
    }),
    
    body('requirements').isArray(),
    
    body('fundingNeeded').notEmpty().isNumeric(),
    
    body('address').notEmpty().isString(),
];

export const checkIfEventExists = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const eventName = req.body.eventName;
        const event: IEvent | null= await Event.findOne({eventName: eventName});
        if(event != null){
            res.status(409).json({message: "This event already exists"});
            return;
        }

        next();
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
    
}

export const validateEventIsActive = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const event = await Event.findOne({_id: req.body.eventId});
        if(!event){
            res.status(404).json({message: "Event doesn't exist"});
            return;
        }

        const currentDate = new Date();
        if(event.endDate && currentDate > new Date(event.endDate)){
            event.status = Status.Finished;
            await event.save();
        }

        if(event.status != Status.On_Going) {
            res.status(401).json({message: "Event has finished"});
            return;
        }

        next();
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

export const validateEventIsFinished = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const event = await Event.findOne({_id: req.query.eventId as string});
        if(!event){
            res.status(404).json({message: "Event doesn't exist"});
            return;
        }

        if(event.status === Status.Finished){
            next();
        } else {
            res.status(403).json({message: "Event hasn't finished yet"});
        }

    }catch(err){
        res.status(500).json({message: "Internal server erro"});
    }
}


const validateEventType = (eventType: any) => {
    if(!Object.values(EventType).includes(eventType)){
        throw new Error(`Event must be of type ${Object.values(EventType).join(', ')}`);
    }
    return true
}

const validateEndDate = (startDate: Date, endDate: Date) => {
    if(endDate < startDate) {
        throw new Error('End date must be after the starting date');
    }
    return true;
}


export const validateAllEventsActive = async (events: HydratedDocument<IEvent>[]) => {
  const now = new Date();

  const processed = await Promise.all(
    events.map(async (event) => {
      if (event.endDate && now > event.endDate) {
        if (event.status !== Status.Finished) {
          event.status = Status.Finished;
          await event.save();
        }
        return null;
      }

      if (event.status !== Status.On_Going) {
        event.status = Status.On_Going;
        await event.save();
      }
      return event;               
    })
  );

  return processed.filter((e): e is HydratedDocument<IEvent> => e !== null);
};