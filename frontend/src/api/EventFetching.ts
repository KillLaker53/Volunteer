import { SidebarEvent } from '../types/SidebarEvent';



export const fetchEvents = async() => {
    try{
   
        const response = await fetch('http://localhost:5000/api/getEvents');
        if(!response.ok){
            throw new Error('Failed to fetch events');
        }
        const events: SidebarEvent[] = await response.json();
    
        return events;
    } catch(error){
        console.error("Error while fetching data", error);
        throw error;
    }
}