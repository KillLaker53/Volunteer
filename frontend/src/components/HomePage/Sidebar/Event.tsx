import React from "react";
import { SidebarEventDto } from 'types-api-volunteer/src/index';
import { useNavigate } from "react-router-dom";
import "./Event.css";

interface EventProps {
    event: SidebarEventDto;
    onEventClick: (event: SidebarEventDto) => void;
}

const Event: React.FC<EventProps> = ({ event, onEventClick }) => {
    const navigate = useNavigate();

    const handleButtonClick = (eventId: string) => {
        navigate(`/event/${eventId}`); 
    };

    return (
        <li className='event' onClick={() => onEventClick(event)} style={{ cursor: "pointer", position: "relative" }}>
            <h3 className='event-title'>{event.eventName}</h3>
            <p className='event-type'><strong>Type:</strong> {event.eventType}</p>
            <p className='event-status'><strong>Status:</strong> {event.status}</p>
            <p className='event-dates'>
                <strong>Start:</strong> {new Date(event.startDate).toLocaleString()}<br />
                <strong>End:</strong> {new Date(event.endDate).toLocaleString()}
            </p>
            <button
                className='event-button'
                onClick={(e) => {
                    e.stopPropagation(); 
                    handleButtonClick(event._id);
                }}
            >
                Details
            </button>
        </li>
    );
}

export default Event;