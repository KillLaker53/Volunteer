import React, {useRef, useEffect} from "react";
import { MapContainer, TileLayer, Marker,  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { EventLocationDto } from 'types-api-volunteer/src';
import "./MapComponent.css";
import { getEventIcon } from "../../library/utils";

interface MapComponentProps {
  events: EventLocationDto[];
  selectedEvent: EventLocationDto | undefined;
}

const MapComponent: React.FC<MapComponentProps> = ({ events, selectedEvent }) => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (selectedEvent && mapRef.current) {
      const { latitude, longitude } = selectedEvent;
      mapRef.current.flyTo([longitude, latitude], 12, { duration: 1.5 });
    }
  }, [selectedEvent]);

  if (!events || events.length === 0) {
    return <div>No events to display on the map.</div>;
  }

  return (
    <MapContainer center={[42.7339, 25.4858]} zoom={8} className="map" ref={mapRef}>
      <TileLayer
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {events.map((event, index) => {

        const customIcon = getEventIcon(event.type);
        return (
          <Marker key={index} position={[event.longitude, event.latitude]} icon={customIcon}>
            
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;