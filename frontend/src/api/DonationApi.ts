import { UserDonationDto } from "types-api-volunteer/src";

export const fetchStripeUrl = async(token: string, amount: number, userId: string, eventId: string) => {
    const response = await fetch('http://localhost:5000/api/donate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({token, amount, userId, eventId}),
    });
    if(!response.ok){
        throw new Error("Error fetching data");
    }
    const stripe_checkout: string = await  response.json();
    return stripe_checkout;
}

export const fetchUserDonations = async(token: string, userId: string) => {
    const response = await fetch(`http://localhost:5000/api/donations?token=${encodeURIComponent(token)}&userId=${encodeURIComponent(userId)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        
    });
    if(!response.ok){
        throw new Error(await response.json());
    }
    const userDonations: UserDonationDto[] = await response.json();
    return userDonations;

}
