import React from 'react';
import { SidebarEvent } from '../../types/SidebarEvent';
import Event from './Event';
import "./EventList.css"

interface EventListProps{
    events: SidebarEvent[];
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