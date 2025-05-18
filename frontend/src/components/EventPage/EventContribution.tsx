import React, { useEffect, useState } from "react";
import { EventDto, UserDto } from "types-api-volunteer/src";
import "./EventContribution.css";
import { useNavigate } from "react-router-dom";
import { signUpForEvent } from "../../api/EventApi";
import Popup from "../Shared/Popup";
import { fetchStripeUrl } from "../../api/DonationApi";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../library/types";

interface EventContributionProps {
  event: EventDto;
  isLoggedIn: boolean;
}

const EventContribution: React.FC<EventContributionProps> = ({ event, isLoggedIn }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupMode, setPopupMode] = useState<"signup" | "donation">("signup");
  const [decodedToken, setDecodedToken] = useState<string>("");
  const navigate = useNavigate();
  const onSignUpForEvent = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    const token = localStorage.getItem('token');
    if(!token){
      throw new Error("token not found");
    }
    const eventId = event._id;

    try {
      await signUpForEvent(token, eventId);
      setPopupMode("signup");
      setShowPopup(true);
    } catch (err) {
      console.error("Error signing up for event:", err);
    }
  };

  const onDonateForEvent = () => {
    setPopupMode("donation");
    setShowPopup(true);
  };

  const handleDonation = async(amount: number) => {
    const token = localStorage.getItem('token');
    
    
    if(token){
      const stripe_checkout = await fetchStripeUrl(token, amount, event._id);
      window.open(stripe_checkout, '_blank');
    
    } else{
      navigate('/login');
    }
  };

  return (
    <div className="event-contribution-container">
      <div className="event-contribution-title">Contribute</div>
      <div className="event-contribution-box">
        <div className="event-contribution-signup">
          <p className="event-contribution-box-title">
            <strong>Sign Up</strong>
          </p>
          <p className="event-contribution-box-text">
            Requirements:
            <ul className="event-requirements-list">
              {event.requirements &&
                event.requirements.map((requirement, index) => (
                  <li key={index} className="event-requirements-item">
                    {requirement}
                  </li>
                ))}
            </ul>
          </p>
          <button
            className="event-contribution-button"
            onClick={onSignUpForEvent}
          >
            Volunteer now
          </button>
        </div>
        <div className="event-contribution-donation">
          <p className="event-contribution-box-title">
            <strong>Donate</strong>
          </p>
          <p className="event-contribution-box-text">
            If you would like to donate to the event please do so by using the
            button below
          </p>
          <button
            className="event-contribution-button"
            onClick={onDonateForEvent}
          >
            Donate now
          </button>
        </div>
      </div>
      {showPopup && popupMode === "signup" && (
        <Popup
          setShowPopup={setShowPopup}
          popupTitle="Signed up for the event successfully!"
          popupText="Thank you for signing up for this event. We look forward to seeing you there!"
        />
      )}
      {showPopup && popupMode === "donation" && (
        <Popup
          setShowPopup={setShowPopup}
          popupTitle="Donate to the Event"
          popupText="Enter your donation amount in lv below:"
          isDonationPopup={true}
          onSend={handleDonation}
        />
      )}
    </div>
  );
};

export default EventContribution;
