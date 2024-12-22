import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from 'react-leaflet';
import "./MapComponent.css"

const MapComponent = () => {
    return(
        <MapContainer center={[42.7339, 25.4858]} zoom={8} className='map' >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
        </MapContainer>
    );
}

export default MapComponent;