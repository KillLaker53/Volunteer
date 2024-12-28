import React from 'react';
import Event from './Event';
import "./EventList.css"
import { SidebarEventDto } from 'types-api-volunteer/src';

interface EventListProps{
    events: SidebarEventDto[];
    onEventClick: (event: SidebarEventDto) => void;
}


const EventList: React.FC<EventListProps> = ({events, onEventClick}) => {
    return(
        <ul className='eventList'>
            {events.map((event) => (
                <Event key={event.id} event={event} onEventClick={onEventClick}/>
            ))}
        </ul>
    );
}

export default EventList;