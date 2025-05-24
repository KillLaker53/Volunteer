import React, { useEffect, useState } from "react";
import './CreateEventPage.css';
import Header from "../Shared/Header";
import InputBox from "./InputBox";
import Popup from "../Shared/Popup";
import { createEvent } from "../../api/EventApi";

const CreateEventPage = () => {
    const [token, setToken] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [eventName, setEventName] = useState<string>("");
    const [eventAddress, setEventAddress] = useState<string>("");
    const [eventType, setEventType] = useState<string>("");
    const [eventDescription, setEventDescription] = useState<string>("");
    const [eventStartDate, setEventStartDate] = useState<string>("");
    const [eventEndDate, setEventEndDate] = useState<string>("");
    const [eventFunding, setEventFunding] = useState<string>("");
    const [eventRequirements, setEventRequirements] = useState<string>("");
    const [showPopup, setShowPopup] = useState<boolean>(false);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            setToken(token);
        }
        setIsLoggedIn(!!token);
    }, []);
    
    const handleOnSubmit = async() => {
        await createEvent(token, eventName, eventDescription, eventAddress, eventType, eventStartDate, eventEndDate, eventRequirements, eventFunding)
        setShowPopup(true);
    }

    return(
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Header>
            {isLoggedIn &&
                <div className="create-event-form">
                    <InputBox type='default' title="Event Name" setValue={setEventName} placeHolder="Enter the name of the event"/>
                    <InputBox type='default' title="Address" setValue={setEventAddress} placeHolder="Enter the address of the event"/>
                    <InputBox type='slider' title="Event Type" setValue={setEventType} />
                    <InputBox type='description' title="Description" setValue={setEventDescription} placeHolder="Enter the description of the event"/>
                    <InputBox type='date' title="Start Date" value={eventStartDate} setValue={setEventStartDate} placeHolder="Enter the date in format: YYYY-MM-DD"/>
                    <InputBox type='date' title="End date" value={eventEndDate} setValue={setEventEndDate} placeHolder="Enter the estimated end date in format: YYYY-MM-DD, HH:MM"/>
                    <InputBox type='default' title="Funding" setValue={setEventFunding} placeHolder="Submit a goal funding"/>
                    <InputBox type='default' title='Requirements' setValue={setEventRequirements} placeHolder="Enter" />
                    <button className='create-event-submit-button' onClick={handleOnSubmit}>
                        Submit
                    </button>
                </div>
            }
            {showPopup && 
                <Popup setShowPopup={setShowPopup} popupTitle="Created event" popupText="You have successfully created an event!"/>
            }
        </>
    );
}

export default CreateEventPage;