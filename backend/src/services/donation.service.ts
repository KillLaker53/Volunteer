import { IDonation, Donation } from "../models/donations"

export const createDonationDoc = async(donationData: IDonation) => {
    try{
        const createdDonation = await Donation.create(donationData);
        
        return createdDonation;
    }catch(err){
        throw new Error("Failed to create a new donation document");
    }

}

export const getUserDonations = async(userId: string) => {
    try{
        const filter = {
            donator: userId,
        }
        const userDonations = await Donation.find(filter);
        return userDonations;

    } catch(err){
        throw new Error("Failed to get the donations for this user");
    }
}