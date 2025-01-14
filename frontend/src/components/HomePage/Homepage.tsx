import React, { useState, useEffect } from 'react';
import './HomePage.css';
import "leaflet/dist/leaflet.css";
import { EventLocationDto, SidebarEventDto } from 'types-api-volunteer/src';
import { fetchEventCoordinates, fetchEvents } from '../../api/EventApi';
import Header from '../Header';
import MapComponent from './MapComponent';
import SidebarToggle from './Sidebar/SidebarToggle';


const HomePage = () => {
    const [events, setEvents] = useState<SidebarEventDto[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventLocationDto| undefined>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
      const loadEvents = async () => {
        try {
          const fetchedEvents = await fetchEvents();
          setEvents(fetchedEvents);
        } catch (err) {
          console.error("Failed to load events:", err);
        }
      };
      loadEvents();
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    
    }, []); 
  
    const mapEvents = fetchEventCoordinates(events);
  
    const handleEventClick = (sidebarEvent: SidebarEventDto) => {
      const mapEvent = mapEvents.find((event) => {
        return event._id === sidebarEvent._id;
      })
      if(mapEvent){
        setSelectedEvent(mapEvent);
      }
      console.log(selectedEvent);
    }
  
    return (
      <div className='homepage'>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <div className='content'>
          <MapComponent events={mapEvents} selectedEvent={selectedEvent}/>
          <SidebarToggle events={events} onEventClick={handleEventClick}/>
        </div>
      </div>
    );
}

export default HomePage;

