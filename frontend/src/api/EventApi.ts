import { SidebarEventDto, EventLocationDto, EventDto, UserEventDto } from 'types-api-volunteer/src/index';
import { BASE_URL } from '../library/constants';

export const fetchEvents = async() => {
    try{
   
        const response = await fetch(`${BASE_URL}/api/homepage/events`);
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

export const fetchEventCoordinates = (events: SidebarEventDto[]) => {
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
     
        const response = await fetch(`${BASE_URL}/api/events/${encodeURIComponent(eventId)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(!response.ok){
            throw new Error(`Http error with status ${response.status}`);
        }
        
        const event: EventDto = await response.json();
        return event;

    }catch(error){
        console.error("Error while fetching data", error);
        throw error;
    }

}

export const signUpForEvent = async(token: string, eventId: string) => {
        
        const response = await fetch(`${BASE_URL}/api/events/${encodeURIComponent(eventId)}/volunteers`, 
            {
                method:'POST',
                headers: {
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({eventId}),
            }
        )

        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

}

export const fetchUserEvents = async (token: string, userId: string): Promise<UserEventDto[]> => {
    try {
        const response = await fetch(`${BASE_URL}/api/users/me/events?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${token}`,
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

export const createEvent = async(
    token: string,
    eventName: string,
    description: string,
    address: string,
    eventType: string,
    startDateNotFormated: string,
    endDateNotFormated: string,
    requirementsString: string,
    funding: string,
    ) => {
    try{
        const startDate = new Date(startDateNotFormated).toISOString();
        const endDate = new Date(endDateNotFormated).toISOString();
        const requirements = requirementsString.split(',').map(requirement => requirement.trim());
        const fundingNeeded = Number(funding);
        const response = await fetch(`${BASE_URL}/api/events`, {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({eventName, description, eventType, startDate, endDate, requirements, address, fundingNeeded})
        });

        if(!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage);
        }

    }catch(error) {
        console.error(error);
    }
}

export const filterEventsByName = async (eventName: string) => {
    try {
        
        const response = await fetch(`${BASE_URL}/api/events/search?eventName=${encodeURIComponent(eventName)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message || 'Error fetching events');
        }
        const events = await response.json();
        return events;
    } catch (err) {
        console.error(err);
    }
};


export const fetchAdminEvents = async() => {
    try{

        const response = await fetch(`${BASE_URL}/api/events/admin`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
            }
        })

        if(!response.ok) {
            const errorMessage = await response.json();
            console.error(errorMessage);
            throw new Error(errorMessage.message || 'Error fetching events');
        }   
        const events: EventDto[] = await response.json();
        return events;
    }catch(err){
        console.error(err);
    }
}

export const rejectEvent = async(token: string, eventId: string) => {
    try{
        const response = await fetch(`${BASE_URL}/api/events/${eventId}/rejection`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error rejecting event');
        }

        return;
    }catch(err){
        console.error(err);
    }
}

export const approveEvent = async(token: string, eventId: string) => {
    try{
        const response = await fetch(`${BASE_URL}/api/events/${eventId}/approval`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error approving event' );
        }
        return;

    }catch(err){
        console.error(err);
    }
}