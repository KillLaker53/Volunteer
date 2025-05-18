import React from "react";
import './EventDetails.css';
import EventContribution from "./EventContribution";
import EventDescription from "./EventDescription";
import { EventDto } from "types-api-volunteer/src";

interface EventDetailsProps{
    event: EventDto;
    isLoggedIn: boolean;
}


const EventDetails: React.FC<EventDetailsProps> = ({event, isLoggedIn}) => {
    return (
        <div className="event-details">
            <EventDescription event={event} />
            <EventContribution event={event} isLoggedIn={isLoggedIn}/>

        </div>

    );
}


export default EventDetails;