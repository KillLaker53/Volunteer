import { Request, Response, NextFunction } from 'express'
import { addUserModel, getUsersModels, getUserModel} from '../services/user.service'
import { IUser } from '../models/users'


export const createUser = async(req:Request, res: Response, next:NextFunction): Promise<void> => {
    try{
        const { username, password, email, firstName, lastName, phone, role} = req.body;
        const newUser: IUser = await addUserModel(username, password, email, firstName, lastName, phone, role);  
        res.status(201).json(newUser); 
    }catch(err){
        next(err);
    }
}

export const getUser = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const userData: IUser | null = await getUserModel(req.body.username);
        res.status(200).json(userData);
    }catch(err){
        next(err);
    }
}


export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const usersData: Array<IUser> | null = await getUsersModels();
        res.status(200).json(usersData);
    }catch(err){
        next(err);
    }
} 