import {NextFunction, Request, Response} from 'express';
import { body } from 'express-validator' 
import { IUser, User } from '../models/users';
import { SECRET_KEY } from '../library/constants';
import jwt from 'jsonwebtoken';
import { DecodedToken } from '../library/types';
import { getUserByEmail } from '../services/user.service';
import bcrypt from 'bcryptjs';
export const validateUserFields = [
    body('username').notEmpty().isString(),
    body('password').isLength({min: 4}).isString(),
    body('firstName').notEmpty().isString(),
    body('lastName').notEmpty().isString(),
    body('email').isEmail().isString(),
    body('phone').isMobilePhone('bg-BG').isString(),
];

export const validateLoginFields = [
    body('email').notEmpty().isString(),
    body('password').notEmpty().isString(),
];

export const checkIfUserExists = async(req:Request, res: Response, next: NextFunction) => {
    const email: String = req.body.email;
    try{
        const user: IUser | null = await User.findOne({email});
        if(user){
            res.status(409).json({message: "A user with this email already exists"});
        }
    }catch(err){
        res.status(500).json({message: "An error occurred while checking if the user exists"});
    }

    next();
}

export const validateJwtToken = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const token: string | undefined = req.header('Authorization')?.split(" ")[1];
        if(!token) {
            res.status(401).json({message: "Access Denied. No token provided"});
        } else{
            if(!SECRET_KEY){
                throw new Error("JWT secret is not defined")
            }
            const decodedToken = jwt.verify(token, SECRET_KEY);
            res.locals.token = decodedToken; 
            next();
        }
        
    }catch(err){
        console.error(err);
        res.status(500).json({message: "An internal error has occurred"});
    }
}

export const validateAdminRole = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const token: string | undefined = req.header('Authorization')?.split(" ")[1];
        if(!token){
            res.status(401).json({message: "Access denied. No token provided"});
            return;
        }

        if(!SECRET_KEY){
            throw new Error("JWT secret is not defined");
        }
        const decodedToken: DecodedToken = jwt.verify(token, SECRET_KEY) as DecodedToken;
        if(decodedToken.role !== "admin"){
            res.status(403).json({message: "Only admins can perform this action"});
        }
        
        next();
    }catch(err){
        console.error(err);
        res.status(500).json({message: "An internal error has occurred"});
    }
}

export const validateUserCredentials = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        
        if(!user || !(await validatePassword(password, user.password))){
            res.status(401).json({message:"Wrong password or email"});
            return;
        }
        res.locals.user = user;
        next();
    }catch(err){
        console.error(err);
        res.status(500).json({message: "An internal error has occurred"});
    }
}

export const validatePassword = async(password: string, hashedPassword: string) => {
    try{
        return await bcrypt.compare(password, hashedPassword);
    }catch(err){
        throw new Error(`Error validating password : ${err}`)
    }
}