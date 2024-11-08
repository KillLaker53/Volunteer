import { Request, Response, NextFunction } from 'express'
import { addUserDoc, getUserDoc, getUsersDocs} from '../services/user.service'
import { IUser } from '../models/users'
import { userValidationSchema } from '../validators/users.validator'

export const createUser = async(req:Request, res: Response, next:NextFunction): Promise<void> => {
    try{

        const {error, value } = userValidationSchema.validate(req.body, {abortEarly: false});
        if(error){
            res.status(400).json({
                error: error.details.map(detail => detail.message)
            });
        }

        const validatedUserData = value as IUser;

        const createdUser: IUser = await addUserDoc(validatedUserData);  
        res.status(201).json(createdUser); 
    }catch(err){
        next(err);
    }
}

export const getUser = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const userData: IUser | null = await getUserDoc(req.body.username);
        res.status(200).json(userData);
    }catch(err){
        next(err);
    }
}


export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const usersData: Array<IUser> | null = await getUsersDocs();
        res.status(200).json(usersData);
    }catch(err){
        next(err);
    }
} 