import React from "react";
import { UserEventDto } from "types-api-volunteer/src";
import './UserEvent.css';
import { FaCalendarAlt, FaTag, FaCheckCircle } from "react-icons/fa";

interface UserEventProps{
    event: UserEventDto;
}

const UserEvent: React.FC<UserEventProps> = ({ event }) => {
    return (
      <div className="user-event-card">
        <h3>{event.eventName}</h3>
        <p>
          <strong><FaTag /> Type:</strong> {event.eventType}
        </p>
        <p>
          <strong><FaCalendarAlt /> Date:</strong> {event.date}
        </p>
        <p>
          <strong><FaCheckCircle /> Status:</strong> {event.status}
        </p>
      </div>
    );
  };
export default UserEvent;