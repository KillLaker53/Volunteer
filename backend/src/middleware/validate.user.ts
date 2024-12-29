import {NextFunction, Request, Response} from 'express';
import { body } from 'express-validator' 
import { IUser, User } from '../models/users';

export const validateUserFields = [
    body('username').notEmpty().isString(),
    body('password').isLength({min: 4}).isString(),
    body('firstName').notEmpty().isString(),
    body('lastName').notEmpty().isString(),
    body('email').isEmail().isString(),
    body('phone').isMobilePhone('bg-BG').isString(),
];


export const checkIfUserExists = async(req:Request, res: Response, next: NextFunction) => {
    const email: String = req.body.email;
    try{
        const user: IUser | null = await User.findOne({email});
        if(user){
            res.status(400).json({message: "A user with this email already exists"});
        }
    }catch(err){
        res.status(500).json({message: "An error occurred while checking if the user exists"});
    }

    next();
}