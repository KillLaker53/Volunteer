import React from "react";
import { eventDescriptionDate, eventDescriptionLocation } from "../../library/constants";
import './EventDescription.css';
import { EventDto } from "types-api-volunteer/src";

interface EventDescriptionProps {
    event: EventDto;

}


const EventDescription: React.FC<EventDescriptionProps> = ({event}) => {
    return(
        <>
        <div className="event-description-title">Event Description</div><div className="event-description-details">
            <div className="event-description-item">
                <img
                    src={eventDescriptionDate}
                    alt="Date Icon"
                    className="event-description-img" />
                <div>
                    <p className="event-description-label">Date:</p>
                    <p className="event-description-info">{event.date}</p>
                </div>
            </div>
            <div className="event-description-item">
                <img
                    src={eventDescriptionLocation}
                    alt="Location Icon"
                    className="event-description-img" />
                <div>
                    <p className="event-description-label">Location:</p>
                    <p className="event-description-info">{event.address}</p>
                </div>
            </div>
        </div>
        <div className="event-description-text">{event.description}</div>
    </>            
    );
}

export default EventDescription;