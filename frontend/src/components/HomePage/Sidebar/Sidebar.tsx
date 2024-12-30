import React from 'react';
import './Sidebar.css';
import { IoClose } from "react-icons/io5";
import {SidebarEventDto} from 'types-api-volunteer/src/index';
import EventList from './EventList';
import SearchBar from './SearchBar';


interface SidebarProps {
  events: SidebarEventDto[]; 
  onClose: () => void;
  onEventClick: (event: SidebarEventDto) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ events, onClose,  onEventClick }) => {
  return (
    <div className='sidebar'>
      <div className="sidebar-header">
        <button className="close-button" onClick={onClose}>
          <IoClose />
        </button>
        <h2 id="sidebar-title">Events</h2>
      </div>
      <SearchBar />
      <EventList events={events} onEventClick={onEventClick}/>
    </div>
  );
};

export default Sidebar;
