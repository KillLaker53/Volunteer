import { Request, Response, NextFunction } from 'express'
import { createUser, getUserDoc, getUsersDocs} from '../services/user.service'
import { IUser } from '../models/users'

export const registerUser = async(req: Request, res: Response, next:NextFunction)=> {
    try{
        
        const userData: IUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            role: req.body.role
        }

        const createdUser: IUser = await createUser(userData);  
        return res.status(201).json(createdUser); 
    }catch(err){
        return res.status(500).json({message: err});
    }
}

export const getUser = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const userData: IUser | null = await getUserDoc(req.body.username);
        return res.status(200).json(userData);
    }catch(err){
        return res.status(500).json({message: err});
    }
}


export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const usersData: Array<IUser> | null = await getUsersDocs();
        return res.status(200).json(usersData);
    }catch(err){
        next(err);
    }
} 