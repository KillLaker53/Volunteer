import { SidebarEventDto, EventLocationDto, EventPageDto, UserEventDto } from 'types-api-volunteer/src/index';

export const fetchEvents = async() => {
    try{
   
        const response = await fetch('http://localhost:5000/api/homepage/getEvents');
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
            _id: event._id,
            type: event.eventType,
            longitude: event.location[0],
            latitude: event.location[1]
        }
    })
}

export const fetchEvent = async(eventId: string) => {
    try{
     
        const response = await fetch(`http://localhost:5000/api/getEvent?eventId=${encodeURIComponent(eventId)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(!response.ok){
            throw new Error(`Http error with status ${response.status}`);
        }
        
        const event: EventPageDto = await response.json();
        return event;

    }catch(error){
        console.error("Error while fetching data", error);
        throw error;
    }

}

export const signUpForEvent = async(userId: string, eventId: string) => {
        const response = await fetch('http://localhost:5000/api/signForEvent', 
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId, eventId}),
            }
        )

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData);
        }

}

export const fetchUserEvents = async (userId: string): Promise<UserEventDto[]> => {
    try {
        const response = await fetch(`http://localhost:5000/api/profile/getEvents?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text(); 
            throw new Error(`Failed to fetch events: ${errorMessage}`);
        }

        const events: UserEventDto[] = await response.json();
        return events;
    } catch (error) {
        console.error("Error fetching user events:", error);
        return []; 
    }
};
