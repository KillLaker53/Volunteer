import React, { useEffect, useState } from "react";
import './SignedUpEvents.css';
import { fetchUserEvents } from "../../api/EventApi";
import { UserDto, UserEventDto } from "types-api-volunteer/src";
import UserEvent from "./UserEvent";

interface UserEventsProps{
    setShowPopup: (arg0: boolean) => void;
    user: UserDto;
}

const SignedUpEvents: React.FC<UserEventsProps> = ({setShowPopup, user}) => {
    const [events, setEvents] = useState<UserEventDto[]>();

    useEffect(() => {
        const fetchAndSetEvents = async (userId: string) => {
            try {
              const token = localStorage.getItem('token');
              if(!token){
                throw new Error("token not found");
              }
              const fetchedEvents: UserEventDto[] = await fetchUserEvents(token, userId);
    
              setEvents(fetchedEvents);
    
            } catch (error) {
              console.error("Error fetching user events:", error);
              setEvents([]); 
            }
          };
        fetchAndSetEvents(user._id);
        }, [user._id]);
    return(
        <div className="user-event-box">
            <h2 className="user-event-box-title"><strong>Events you have signed up for</strong></h2>
    
                {events && 

                    events.map((event, index) => (
                        <UserEvent setShowPopup={setShowPopup} key={index} user={user} event={event} />
                    ))
                }
     
        </div>
    );
};

export default SignedUpEvents;
