import { SidebarEventDto } from "types-api-volunteer/src";
import { earthquakeIcon, fireIcon, floodingIcon } from "./constants";

  
export const getEventIcon = (eventType: string) => {
    
    switch(eventType.toLowerCase()){
        case "flooding":
          return floodingIcon;
        case "fire":
          return fireIcon;
        case "earthquake":
          return earthquakeIcon;
    }
    
}

export const filterSidebarEventsByName = (name: string, events: SidebarEventDto[]) => {
  const filteredEvents = events.filter((event) => {
    return event.eventName.includes(name);
  });
  return filteredEvents;

}