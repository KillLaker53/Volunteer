import React from 'react';
import { VscTriangleLeft } from "react-icons/vsc";
import Sidebar from './Sidebar';
import { SidebarEventDto } from 'types-api-volunteer/src/index';
import "../../App.css"

interface SidebarToggleProps {
  arrowVisible: boolean;
  sidebarVisible: boolean;
  onArrowClick: () => void;
  onSidebarClose: () => void;
  events: SidebarEventDto[],
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({
  arrowVisible,
  sidebarVisible,
  onArrowClick,
  onSidebarClose,
  events,
}) => {

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