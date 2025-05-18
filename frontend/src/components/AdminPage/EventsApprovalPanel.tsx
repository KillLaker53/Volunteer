import React, { useEffect } from "react";
import { EventDto } from "types-api-volunteer/src";
import EventCard from "./EventCard";
import './EventsApprovalPanel.css';
interface EventApprovalPanelProps {
    events: EventDto[] | undefined;
    token: string;
}

const EventApprovalPanel: React.FC<EventApprovalPanelProps> = ({token, events}) => {
    
    return (
        <>
            <div className="event-approval-title">
                Approval of Events
            </div>
        
            {events &&
                events.map(event => (
                    <EventCard token={token} event={event} />
            ))}

        </>
    );
}

export default EventApprovalPanel;