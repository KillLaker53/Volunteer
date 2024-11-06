import  { User, IUser } from '../models/users'


export const addUserModel = async(
    username: String, 
    password: String,
    firstName: String, 
    lastName: String, 
    email: String, 
    phone: String, 
    role: String
    ): Promise<IUser> => {
        try{
            const data = {username, password, firstName, lastName, email, phone, role};
            const newUser: IUser = await User.create(data);
            return newUser;

        }catch(err){
            console.error('ERROR: Creating user was not successful');
            throw new Error('Failed to create a new user');
        }
}


export const getUserModel = async(usernameToGet: String): Promise<IUser| null> => {
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


export const getUsersModels = async(): Promise<Array<IUser> | null> => {
    try{
        const filter = {}
        const users: Array<IUser> | null = await User.find(filter);
        return users;
    }catch(err){
        console.log('No users found');
        throw new Error('Failed to find all users');
    }
}

