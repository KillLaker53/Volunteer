import { SidebarEventDto, EventLocationDto } from 'types-api-volunteer/src/index';



export const fetchEvents = async() => {
    try{
   
        const response = await fetch('http://localhost:5000/api/getEvents');
        if(!response.ok){
            throw new Error('Failed to fetch events');
        }
        const events: SidebarEventDto[] = await response.json();
        return events;
    } catch(error){
        console.error("Error while fetching data", error);
        throw error;
    }
}

export const fetchEventCoordinates = (events: SidebarEventDto[]): EventLocationDto[] => {
    return events.map((event) => {
        return {
            id: event.id,
            type: event.eventType,
            longitude: event.location[0],
            latitude: event.location[1]
        }
    })
}