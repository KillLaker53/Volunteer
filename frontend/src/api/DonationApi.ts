import { UserDonationDto } from "types-api-volunteer/src";
import {baseUrl} from '../library/constants';
export const fetchStripeUrl = async(token: string, amount: number, eventId: string) => {
    
    const response = await fetch(`${baseUrl}/api/donate`, {
        method: 'POST',
        headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({amount, eventId}),
    });
    if(!response.ok){
        throw new Error("Error fetching data");
    }
    const stripe_checkout: string = await  response.json();
    return stripe_checkout;
}

export const fetchUserDonations = async(token: string, userId: string) => {
    const response = await fetch(`${baseUrl}/api/donations`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
        
    });
    if(!response.ok){
        throw new Error(await response.json());
    }
    const userDonations: UserDonationDto[] = await response.json();
    return userDonations;

}
