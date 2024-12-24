import React, { useState, useEffect } from 'react';
import './App.css';
import "leaflet/dist/leaflet.css";
import { SidebarEventDto } from 'types-api-volunteer/src';
import { fetchEventCoordinates, fetchEvents } from './api/EventFetching';
import Topbar from './components/Topbar';
import MapComponent from './components/MapComponent';
import SidebarToggle from './components/Sidebar/SidebarToggle';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [arrowVisible, setArrowVisible] = useState<boolean>(true);
  const [events, setEvents] = useState<SidebarEventDto[]>([]);

  const toggleSidebar = () => {
    setSidebarVisible(true);
    setArrowVisible(false);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
    setArrowVisible(true);
  };

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

  const locationEvents = fetchEventCoordinates(events);

  return (
    <div className='homepage'>
      <Topbar />
      <div className='content'>
        
        <MapComponent events={locationEvents} />
        <SidebarToggle
          arrowVisible={arrowVisible}
          sidebarVisible={sidebarVisible}
          onArrowClick={toggleSidebar}
          onSidebarClose={closeSidebar}
          events={events}
        />
      </div>
    </div>
  );
}

export default App;
