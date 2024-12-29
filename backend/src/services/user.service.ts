import { ADMIN_EMAIL } from '../constants';
import  { User, IUser } from '../models/users'
import { UserRole } from '../types/types';


export const createUser = async(newUser: IUser) => {
        try{
            const createdUser: IUser = await User.create(newUser);
            return createdUser;

        }catch(err){
            console.error('ERROR: Creating user was not successful');
            throw new Error('Failed to create a new user');
        }
}

export const getUser = async(userEmail: string, userPassword: string ) => {
    try{
        const filter = {
            email: userEmail,
        }
        const user: IUser | null = await User.findOne(filter);
        return user;
    } catch(err) {
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