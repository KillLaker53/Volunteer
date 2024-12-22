import React, { useState, useEffect } from 'react';
import { VscTriangleLeft } from "react-icons/vsc";
import Sidebar from './Sidebar';
import { fetchEvents } from '../../api/EventFetching';
import { SidebarEvent } from '../../types/SidebarEvent';
import "../../App.css"

interface SidebarToggleProps {
  arrowVisible: boolean;
  sidebarVisible: boolean;
  onArrowClick: () => void;
  onSidebarClose: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({
  arrowVisible,
  sidebarVisible,
  onArrowClick,
  onSidebarClose,
}) => {
  const [events, setEvents] = useState<SidebarEvent[]>([]);

  useEffect(() => {
    const loadEvents = async() => {
      try{
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
      }catch(err){

      } 
    }

    if(sidebarVisible){
      loadEvents();
    }
  }, [sidebarVisible]);

  return (
    <>
      {arrowVisible && (
        <VscTriangleLeft
          id='sidebar-arrow'
          onClick={onArrowClick}
        />
      )}
      {sidebarVisible && <Sidebar events={events} onClose={onSidebarClose} />}
    </>
  );
};

export default SidebarToggle;