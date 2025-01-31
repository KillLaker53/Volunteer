import React, {useState} from 'react';
import { VscTriangleLeft } from "react-icons/vsc";
import Sidebar from './Sidebar';
import { SidebarEventDto } from 'types-api-volunteer/src/index';
import "../HomePage.css"

interface SidebarToggleProps {
  events: SidebarEventDto[],
  onEventClick: (event: SidebarEventDto) => void;
  setEvents: (events:SidebarEventDto[]) => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({events, onEventClick, setEvents}) => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [arrowVisible, setArrowVisible] = useState<boolean>(true);
 

  const onArrowClick = () => {
    setSidebarVisible(true);
    setArrowVisible(false);
  };

  const onCloseSidebar = () => {
    setSidebarVisible(false);
    setArrowVisible(true);
  };

  return (
    <>
      {arrowVisible && 
        <VscTriangleLeft
          id='sidebar-arrow'
          onClick={onArrowClick}
        />
      }
      {sidebarVisible && <Sidebar events={events} setEvents={setEvents} onClose={onCloseSidebar} onEventClick={onEventClick}/>}
    </>
  );
};

export default SidebarToggle;