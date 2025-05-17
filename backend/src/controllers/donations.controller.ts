import {Request, Response, NextFunction} from 'express';
import Stripe from 'stripe';
import { BASE_URL, STRIPE_SECRET } from '../library/constants';
import { IDonation } from '../models/donations';
import { createDonationDoc, getUserDonations } from '../services/donation.service';
import { UserDonationDto } from 'types-api-volunteer/src';
import { getDonationEventDocs } from '../services/events.service';

const stripe = new Stripe(STRIPE_SECRET, {
    apiVersion: '2024-12-18.acacia',
});

export const makeDonation = async(req: Request, res: Response, next: NextFunction) => {
    try{
    const eventId = req.body.eventId;
    const userId = res.locals.token.id;
    const donationAmount = req.body.amount;
    console.log(donationAmount)
    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: 'bgn',
                product_data: {
                    name: 'Amount you wish to donate'
                },
                unit_amount: donationAmount * 100,

            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: `${BASE_URL}/success`,
        cancel_url: `${BASE_URL}/cancel`, 
    });
    const donationData: IDonation = {
        donator: userId,
        event: eventId,
        amount: donationAmount,
        
    }
    const createdDonation = await createDonationDoc(donationData);

    res.status(200).json(session.url);
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

export const getUserDonationDetails = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = res.locals.token.id;
        const userDonations = await getUserDonations(userId);
        const eventIds = userDonations.map(donation => donation.event.toString());
        const events = await getDonationEventDocs(eventIds);
        const eventMap = new Map(events?.map(event => [event._id.toString(), event.eventName]));
        
        const transformedUserDonations: UserDonationDto[] = userDonations.map(donation => ({
            _id: donation._id.toString(),
            eventName: eventMap.get(donation.event.toString()) || 'Unknown Event',
        }));

        res.status(201).json(transformedUserDonations);
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}