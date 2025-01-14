import React, { useEffect, useState } from "react";
import './SignedUpEvents.css';
import { fetchUserEvents } from "../../api/EventApi";
import { UserEventDto } from "types-api-volunteer/src";
import UserEvent from "./UserEvent";

interface UserEventsProps{
    userId: string;
}

const SignedUpEvents: React.FC<UserEventsProps> = ({userId}) => {
    const [events, setEvents] = useState<UserEventDto[]>();
    
 


    useEffect(() => {
        const fetchAndSetEvents = async (userId: string) => {
            try {
              const fetchedEvents: UserEventDto[] = await fetchUserEvents(userId);
    
              setEvents(fetchedEvents);
    
            } catch (error) {
              console.error("Error fetching user events:", error);
              setEvents([]); 
            }
          };
        fetchAndSetEvents(userId);
        }, [userId]);
    return(
        <div className="user-event-box">
            <h2 className="user-event-box-title"><strong>Events you have signed up for</strong></h2>
    
                {events && 

                    events.map((event, index) => (
                        <UserEvent key={index} event={event} />
                    ))
                }
     
        </div>
    );
};

export default SignedUpEvents;
