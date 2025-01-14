import React, { useState } from "react";
import { EventPageDto, UserDto } from "types-api-volunteer/src";
import './EventContribution.css';
import { useNavigate } from "react-router-dom";
import { signUpForEvent } from "../../api/EventApi";

interface EventContributionProps{
    event: EventPageDto;
    isLoggedIn: boolean;
}


const EventContribution: React.FC<EventContributionProps> = ({event, isLoggedIn}) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const navigate = useNavigate();


    const onSignUpForEvent = async() => {
        if(!isLoggedIn){
            navigate('/login');
        }
        const stringUserData = localStorage.getItem('userData');
        if(!stringUserData){
            throw new Error("There was a problem getting user data");
        }
        const parsedUserData: UserDto = JSON.parse(stringUserData);
        const userId = parsedUserData._id;
        const eventId = event._id;
        
        try{
            await signUpForEvent(userId, eventId);
            setShowPopup(true);
        }catch(err){

        }
        
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
                    <p className="event-contribution-box-text">Requirements: 
                        <ul className="event-requirements-list">
                            {event.requirements && event.requirements.map((requirement, index) => (
                                <li key={index} className="event-requirements-item"> {requirement}</li>
                            ))}
                        </ul>   

                    </p>
                    <button className="event-contribution-button" onClick={onSignUpForEvent}>Volunteer now</button>
                </div>
                <div className="event-contribution-donation">
                    <p className="event-contribution-box-title"><strong>Donate</strong></p>
                    <p className="event-contribution-box-text">If you would like to donate to the event please do so by using the button below</p>
                    <button className="event-contribution-button" onClick={onDonateForEvent}>Donate now</button>
                </div>
            </div>
            { showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Signed up for the event successfully!</h2>
                        <p>Thank you for signing up for this event. We look forward to seeing you there!</p>
                        <button onClick={() => setShowPopup(false)} className="popup-close-button">
                            Close
                        </button>
                    </div>
                </div>
            )

            }

        </div>
        
    );
};

export default EventContribution;