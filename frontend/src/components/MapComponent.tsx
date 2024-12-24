import React from "react";
import { MapContainer, TileLayer, Marker,  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { EventLocationDto } from 'types-api-volunteer/src';
import "./MapComponent.css";
import { Icon } from 'leaflet';

interface MapComponentProps {
  events: EventLocationDto[];
}

const MapComponent: React.FC<MapComponentProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return <div>No events to display on the map.</div>;
  }

  const fireIcon = new Icon({
    iconUrl: require("../images/fire.png"),
    iconSize: [45, 45]
  })

  const floodingIcon = new Icon({
    iconUrl: require("../images/flooding.png"),
    iconSize: [45, 45]
  })

  const earthquakeIcon = new Icon({
    iconUrl: require("../images/earthquake.png"),
    iconSize: [45, 45]
  })

  return (
    <MapContainer center={[42.7339, 25.4858]} zoom={8} className="map">
      <TileLayer
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {events.map((event, index) => {

        let customIcon;
        switch(event.type.toLowerCase()){
          case "flooding":
            customIcon = floodingIcon;
            break;
          case "fire":
            customIcon = fireIcon;
            break;
          case "earthquake":
            customIcon = earthquakeIcon;
            break;
        }
        return (
          <Marker
            key={index}
            position={[event.longitude, event.latitude]}
            icon={customIcon}
          ></Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
