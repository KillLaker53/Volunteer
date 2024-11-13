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


export const getUserDoc = async(usernameToGet: String) => {
    try{
        const filter = {
            username: usernameToGet
        };
    
        const user: IUser | null = await User.findOne(filter);
        return user;

    }catch(err){
        console.log(`Could not find user : ${usernameToGet}`);
        throw new Error('Failed to find user');
    }
    
}


export const getUsersDocs = async() => {
    try{
        const filter = {}
        const users: Array<IUser> | null = await User.find(filter);
        return users;
    }catch(err){
        console.log('No users found');
        throw new Error('Failed to find all users');
    }
}

