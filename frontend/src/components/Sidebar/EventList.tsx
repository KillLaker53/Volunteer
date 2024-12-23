import React from 'react';
import Event from './Event';
import "./EventList.css"
import { SidebarEventDto } from 'types-api-volunteer/src';

interface EventListProps{
    events: SidebarEventDto[];
}


const EventList: React.FC<EventListProps> = ({events}) => {
    return(
        <ul className='eventList'>
            {events.map((event) => (
                <Event event={event}/>
            ))}
        </ul>
    );
}

export default EventList;