import  { User, IUser } from '../models/users'


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

