import { HydratedDocument } from 'mongoose';
import { ADMIN_EMAIL } from '../constants';
import  { User, IUser } from '../models/users'
import { UserRole } from '../library/types';
import { UserDto } from 'types-api-volunteer/src';
import { getUserEventsDocs } from './events.service';


export const createUser = async(newUser: IUser) => {
        try{
            const createdUser: HydratedDocument<IUser> = await User.create(newUser);
            return createdUser;

        }catch(err){
            console.error('ERROR: Creating user was not successful');
            throw new Error('Failed to create a new user');
        }
}

export const getUserByEmail = async(userEmail: string ): Promise<HydratedDocument<IUser> | null> => {
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

export const determineUserRole = (email: string) => {
            
    let role: UserRole = UserRole.Volunteer;

    if(email.endsWith("@elsys-bg.org")){
        role = UserRole.Organization;
    }

    if (ADMIN_EMAIL && new RegExp(ADMIN_EMAIL).test(email)) {
        role = UserRole.Admin;
    }
    return role;
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
