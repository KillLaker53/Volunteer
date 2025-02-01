import mongoose, { model, Schema, Model } from "mongoose";
import { UserRole } from "../library/types";

export interface IUser{
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: UserRole;
    events: Array<Schema.Types.ObjectId>;
}

export type UserModel = Model<IUser>;

const UserSchema: Schema = new Schema<IUser, UserModel>({
    username: { type: String },
    password: { type: String},
    firstName: { type: String },
    lastName: { type: String}, 
    email: { type: String},
    phone: { type: String },
    role: { type: String },
    events: {type: [mongoose.Schema.Types.ObjectId], ref:'Events'}
}, {collection: 'Users'});


export const User: UserModel = model<IUser, UserModel>('User', UserSchema)