import React from 'react';
import './Sidebar.css';
import { IoClose } from "react-icons/io5";
import { SidebarEvent } from '../../types/SidebarEvent';
import EventList from './EventList';



interface SidebarProps {
  events: SidebarEvent[]; // Array of event objects
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ events, onClose }) => {
  return (
    <div className='sidebar'>
      <button className="close-button" onClick={onClose}>
        <IoClose />
      </button>
      <h2 id='sidebar-title'>Events</h2>
      <EventList events={events}/>
    </div>
  );
};

export default Sidebar;
