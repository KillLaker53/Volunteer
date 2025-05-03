import {Request, Response, NextFunction} from 'express';
import Stripe from 'stripe';
import { STRIPE_SECRET } from '../library/constants';
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
    const userId = req.body.userId;
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
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel', 
    });
    const donationData: IDonation = {
        donator: userId,
        event: eventId,
        amount: donationAmount,
        
    }
    const createdDonation = await createDonationDoc(donationData);

    //res.redirect(303, session.url);
    res.status(200).json(session.url);
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

export const userDonationDetails = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.query.userId as string;
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