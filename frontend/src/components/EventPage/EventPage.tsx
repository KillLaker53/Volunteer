import React, { useEffect, useState } from 'react';
import './EventPage.css';
import Header from '../Shared/Header';
import { useParams } from 'react-router-dom';
import EventPageTitle from './EventPageTitle';
import EventDetails from './EventDetails';
import { EventPageDto } from 'types-api-volunteer/src';
import { fetchEvent } from '../../api/EventApi';

const EventPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [doesEventExist, setDoesEventExist] = useState<boolean>(false);
    const { eventId } = useParams<{ eventId?: string }>();

    const [event, setEvent] = useState<EventPageDto | null>(null);
    
    useEffect(() => {
        const fetchAndSetEvent = async () => {
            if (!eventId) {
                setDoesEventExist(false);
                return;
            }
            try {
                const event = await fetchEvent(eventId);
                if (event) {
                    setEvent(event);
                    setDoesEventExist(true);
                } else {
                    setDoesEventExist(false);
                }
            } catch (error) {
                console.error("Error fetching the event:", error);
                setDoesEventExist(false);
            }
        };
    
        fetchAndSetEvent();
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, [eventId]);

    if(!doesEventExist){
        return <p>No such event exists</p>;
    }

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {event && 
                <>
                    <EventPageTitle event={event}  />
                    <EventDetails event={event} isLoggedIn={isLoggedIn}/>
                </>
            }
        </>
    );
}

export default EventPage;