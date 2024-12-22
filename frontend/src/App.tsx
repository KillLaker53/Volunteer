import React, { useState } from 'react';
import './App.css';
import "leaflet/dist/leaflet.css";


import Topbar from './components/Topbar';
import MapComponent from './components/MapComponent';
import SidebarToggle from './components/Sidebar/SidebarToggle';
function App() {

  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [arrowVisible, setArrowVisible] = useState<boolean>(true);
  const toggleSidebar = () => {
    setSidebarVisible(true);
    setArrowVisible(false);
  }
  const closeSidebar = () => {
    setSidebarVisible(false);
    setArrowVisible(true);
  }


  return (
    <div className='homepage' >
     <Topbar />
       <div className='content'>
          <MapComponent />
          <SidebarToggle
            arrowVisible={arrowVisible}
            sidebarVisible={sidebarVisible}
            onArrowClick={toggleSidebar}
            onSidebarClose={closeSidebar}
          />
        </div>
    </div>
  );
}

export default App;