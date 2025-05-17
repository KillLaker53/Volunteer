import { HydratedDocument } from 'mongoose';
import { ADMIN_EMAIL } from '../library/constants';
import  { User, IUser } from '../models/users'
import { UserRole } from '../library/types';
import { UserDto } from 'types-api-volunteer/src';
import { sendEventNotification } from '../library/utils';
import { IEvent } from '../models/events';


export const createUser = async(newUser: IUser) => {
        try{
            const createdUser: HydratedDocument<IUser> = await User.create(newUser);
            return createdUser;

        }catch(err){
            console.error('ERROR: Creating user was not successful');
            throw new Error('Failed to create a new user');
        }
}

export const getUserByEmail = async(userEmail: string ) => {
    try{
        const filter = {
            email: userEmail,
        }
        const user = await User.findOne(filter);
        if(!user){
            return null;
        }
        
        return user;
    } catch(err) {
        throw new Error('Failed to find user');
    }
}

export const getUserDoc = async(userId: string) => {
    try{
        const filter ={
            _id: userId,
        }

        const user = await User.findOne(filter);
        if(!user){
            throw new Error("No such user");
        }

        const transformedUser: UserDto = {
            _id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            role: user.role,
        }

        return transformedUser;
    }catch(err){
        throw new Error('Failed to find user');
    }
}


export const getUsersDocs = async() => {
    try{
        const filter = {}
        const users: Array<IUser> | null = await User.find(filter);
        return users;
    }catch(err){
        throw new Error('Failed to find all users');
    }
}

export const addEventToUserHistory = async(userId: string, eventId: string) => {
    try{
        const result = await User.updateOne(
            {_id: userId},
            {$addToSet: {events: eventId}}
        );
        return result;
    }catch(err){

    };
}

export const getUserEvents = async(userId: string) => {
    try{
        const filter = {
            _id: userId,
        }
        const user = await User.findOne(filter);

        return user?.events;
    }catch(err){
        throw new Error('Internal server error');
    }
}

export const getUserEmail = async(userId: string) => {
    try{
        const filter = {
            _id: userId,
        }
        const user = await User.findOne(filter);
        return user?.email;
    }catch(err) {
        throw new Error('Internal server error');
    }
}

export const notifyUsers = async(event: IEvent) => {
    try{
        const users = await getUsersDocs();
        users.map(user => sendEventNotification(event, user.email))
    }catch (err){
        throw new Error('Sending notifications about new event failed');
    }
}

export const updateProfileField = async(userId: string, updatedField: Partial<Record<string, any>>) => {
    try{
        const result = await User.updateOne(
            {_id: userId},
            {$set: updatedField},
            {new: true}
        );
        if(result.modifiedCount !== 1) {
            throw new Error(`Error while trying to update the ${updatedField}`);
        }

    }catch(err){ 
        throw new Error(`Error updating the  of user: ${userId} failed - ${err}`);
    }
}


export const updateProfileRoleDoc = async(userId: string, newRole: string) => {
    try{
        const result = await User.updateOne(
            {_id: userId},
            {$set: {role: newRole}}
        );
        if(result.modifiedCount !== 1) {
            throw new Error("Error why trying to update the role of a user");
        }

    }catch(err){
        throw new Error(`Error updating the role of user ${userId} - ${err}`)
    }
}