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