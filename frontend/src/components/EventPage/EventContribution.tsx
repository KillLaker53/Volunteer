import React from "react";
import { EventPageDto, UserDto } from "types-api-volunteer/src";
import './EventContribution.css';
import { useNavigate } from "react-router-dom";
import { signUpForEvent } from "../../api/EventApi";

interface EventContributionProps{
    event: EventPageDto;
    isLoggedIn: boolean;
}


const EventContribution: React.FC<EventContributionProps> = ({event, isLoggedIn}) => {
    const navigate = useNavigate();
    const onSignUpForEvent = () => {
        if(!isLoggedIn){
            navigate('/login');
        }
        const stringUserData = localStorage.getItem('userData');
        if(!stringUserData){
            throw new Error("There was a problem getting user data");
        }
        const parsedUserData: UserDto = JSON.parse(stringUserData);
        const userId = parsedUserData._id;
        const eventId = event.id;
        signUpForEvent(userId, eventId);

    }

    const onDonateForEvent = () => {

    }

    return(
        <div className="event-contribution-container">
            <div className="event-contribution-title">
                Contribute
            </div>
            <div className="event-contribution-box">
                <div className="event-contribution-signup">
                    <p className="event-contribution-box-title"><strong>Sign Up</strong></p>
                    <p className="event-contribution-box-text">Prerequiset</p>
                    <button className="event-contribution-button" onClick={onSignUpForEvent}>Volunteer now</button>
                </div>
                <div className="event-contribution-donation">
                    <p className="event-contribution-box-title"><strong>Donate</strong></p>
                    <p className="event-contribution-box-text">If you would like to donate to the event please do so by using the button below</p>
                    <button className="event-contribution-button" onClick={onDonateForEvent}>Donate now</button>
                </div>
            </div>
        </div>
    
    );
}

export default EventContribution;