import React from "react";
import { SidebarEventDto } from 'types-api-volunteer/src/index';
import "./Sidebar.css"

interface EventProps {
    event: SidebarEventDto;
} 

const Event: React.FC<EventProps> = ({event}) => {
    
    return(
        <li className='event' >
            <h3 className='event-title'>{event.eventName}</h3>
            <p className='event-type'><strong>Type:</strong> {event.eventType}</p>
            <p className='event-status'><strong>Status:</strong> {event.status}</p>
            <p className='event-dates'>
                <strong>Start:</strong> {new Date(event.startDate).toLocaleString()}<br />
                <strong>End:</strong> {new Date(event.endDate).toLocaleString()}
            </p>
        </li>
    );
}

export default Event;