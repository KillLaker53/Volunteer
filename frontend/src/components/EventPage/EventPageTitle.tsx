import React  from "react";
import { eventTitleBackground } from "../../library/constants";
import './EventPageTitle.css';
import { EventDto } from "types-api-volunteer/src";


interface EventPageTitleProps{
    event: EventDto;
}


const EventPageTitle: React.FC<EventPageTitleProps> = ({event}) => {
    return(
        <div className="event-page-title">
            <div className="event-title-text-container">
                <p className='event-title-text1'>Event</p>
                <p className="event-title-text2">{event.eventName}</p>
            </div>
            <img src={eventTitleBackground} alt="alt-image" className="event-title-img" />
        </div>
    );
}

export default EventPageTitle;