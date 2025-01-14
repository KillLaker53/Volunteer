import { UserDto, AuthenticatedResponseDto } from "types-api-volunteer/src";

export const loginUser = async(email: string, password: string) => {

    const response = await fetch('http://localhost:5000/api/login', {
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
    const response = await fetch('http://localhost:5000/api/register', {
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

    const response = await fetch(`http://localhost:5000/api/getUser?userId=${encodeURIComponent(userId)}`, {
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
