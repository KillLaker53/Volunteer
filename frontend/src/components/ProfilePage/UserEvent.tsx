import React from "react";
import { UserDto, UserEventDto } from "types-api-volunteer/src";
import './UserEvent.css';
import { FaCalendarAlt, FaTag, FaCheckCircle } from "react-icons/fa";
import { redPdf } from "../../library/constants";
import { fetchAndSendPdf } from "../../api/UserApi";

interface UserEventProps{
  setShowPopup: (arg0: boolean) => void;
  user: UserDto;
  event: UserEventDto;
}

const UserEvent: React.FC<UserEventProps> = ({ setShowPopup, user, event }) => {
  const handleSendPdf = async() => {
    try{
      await fetchAndSendPdf(user._id, event._id);
      setShowPopup(true);      
    }catch(error){

    }

  }

  const getStatusClassName = (status: string) => {
    return status === 'Finished' ? 'status-finished' : 'status-default';
  }

  return (
    <div className="user-event-card">
      <div className="user-event-card-information">
        <h3>{event.eventName}</h3>
        <p>
          <strong><FaTag /> Type:</strong> {event.eventType}
        </p>
        <p>
          <strong><FaCalendarAlt /> Date:</strong> {event.date}
        </p>
        <p>
          <strong><FaCheckCircle /> Status:</strong> 
          <span className={getStatusClassName(event.status)}>{event.status}</span>
        </p>
      
      </div>
      {event.status === "Finished" &&( 
        <button className="button-send-email-pdf" onClick={handleSendPdf}>
            <img className="button-send-email-pdf-img" alt="" src={redPdf}/>
            <div className="button-send-email-pdf-text">
              Email My Certificate
            </div>
        </button>
      )}


    </div>
  );
};
export default UserEvent;