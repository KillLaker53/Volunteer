import React from "react";
import './CreateEvent.css';
import { useNavigate } from "react-router-dom";

interface CreateEventButtonProps {

};


const CreateEventButton: React.FC<CreateEventButtonProps> = () => {
    const navigate = useNavigate();
    const handleOnCreateEvent = () => {
        navigate('/createEvent');
    }
    
    return (
        <button className="sidebar-create-event-button" onClick={handleOnCreateEvent}>
            Create Event
        </button>
        
    );
}

export default CreateEventButton;