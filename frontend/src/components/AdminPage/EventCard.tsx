import React from "react";
import { EventDto } from "types-api-volunteer/src";
import './EventCard.css';
import { approveEvent, rejectEvent } from "../../api/EventApi";
interface EventCardProps {
    event: EventDto;
    token: string;
}

const EventCard: React.FC<EventCardProps> = ({ token, event }) => {
    const handleRejectEvent = async() => {
        try{
            await rejectEvent(token, event._id); 

        }catch(err){
            console.error(err);
        }
    }

    const handleApproveEvent = async() => {
        try{
            await approveEvent(token, event._id);
        }catch(err){
            console.error(err);
        }
    }

    return (
        <div className="event-card">
            <div className="event-info">
            <h3 className="event-card-name">{event.eventName}</h3>
            <p className="event-card-date">{event.date}</p>
            <p className="event-card-creator">Created by {event.creatorId}</p>
            <p className="event-card-type">{event.eventType}</p>
            </div>

            <div className="event-actions">
            <button className="approve-button"onClick={handleApproveEvent}>Approve</button>
            <button className="reject-button" onClick={handleRejectEvent}>Reject</button>
            </div>
        </div>
    );
}

    
    


export default EventCard;