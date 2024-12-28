import React, { useState, useEffect } from 'react';
import './HomePage.css';
import "leaflet/dist/leaflet.css";
import { EventLocationDto, SidebarEventDto } from 'types-api-volunteer/src';
import { fetchEventCoordinates, fetchEvents } from '../../api/EventApi';
import Header from './Header';
import MapComponent from './MapComponent';
import SidebarToggle from './Sidebar/SidebarToggle';


const HomePage = () => {
    const [events, setEvents] = useState<SidebarEventDto[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventLocationDto| undefined>();
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
    }, []); 
  
    const mapEvents = fetchEventCoordinates(events);
  
    const handleEventClick = (sidebarEvent: SidebarEventDto) => {
      const mapEvent = mapEvents.find((event) => {
        return event.id === sidebarEvent.id;
      })
      if(mapEvent){
        setSelectedEvent(mapEvent);
      }
      console.log(selectedEvent);
    }
  
    return (
      <div className='homepage'>
        <Header />
        <div className='content'>
          <MapComponent events={mapEvents} selectedEvent={selectedEvent}/>
          <SidebarToggle events={events} onEventClick={handleEventClick}/>
        </div>
      </div>
    );
}

export default HomePage;

