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