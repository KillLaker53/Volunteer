import mongoose, { Schema, Model, model } from 'mongoose'

export interface IDonation {
    donator: mongoose.Schema.Types.ObjectId;
    event: mongoose.Schema.Types.ObjectId;
    amount: Number;
    date: Date;
}

export type DonationModel = Model<IDonation>;

const DonationSchema: Schema = new Schema<IDonation, DonationModel>({
    donator: {type: mongoose.Schema.Types.ObjectId},
    event: {type: mongoose.Schema.Types.ObjectId},
    amount: {type: Number},
    date: {type: Date},
}, {collection: "Donations"}); 

export const Donation: DonationModel = model<IDonation, DonationModel>('Donation', DonationSchema);