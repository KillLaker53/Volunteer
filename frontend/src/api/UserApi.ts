import { UserDto, AuthenticatedResponseDto } from "types-api-volunteer/src";
import { baseUrl } from "../library/constants";

export const loginUser = async(email: string, password: string) => {

    const response = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  
        },
        body: JSON.stringify({email, password}),
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to login');
    }
    
    const response_data: AuthenticatedResponseDto<UserDto> = await response.json();
    return response_data;
}

export const registerUser = async(
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
) => {
    const response = await fetch(`${baseUrl}/api/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password, email, firstName, lastName, phone})
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    const response_data: AuthenticatedResponseDto<UserDto> = await response.json();
    return response_data;
}

export const fetchUser = async(userId: string) => {
    console.log(userId);
    const response = await fetch(`${baseUrl}/api/users/${encodeURIComponent(userId)}`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
            },
    });
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    const response_data: UserDto = await response.json();
    return response_data;
}

export const fetchUsers = async() => {
    const response = await fetch(`${baseUrl}/api/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message);
    }
    const response_data: UserDto[] = await response.json();
    return response_data;
}


export const fetchAndSendPdf = async(userId: string, eventId: string) => {
    const response = await fetch(`${baseUrl}/api/users/me/certificate-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application-json',
        },
        body: JSON.stringify({eventId})
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

}

export const updateUserRole = async(token: string, userId: string, newRole: string) => {
    try{
        if(!token){
            throw new Error('Invalid session');
        }
        const response = await fetch(`${baseUrl}/api/users/${userId}/role`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({userId, newRole}),
        });
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    }catch(err){
        console.error(err);
    }   
}