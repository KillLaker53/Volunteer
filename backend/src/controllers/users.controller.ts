import { Request, Response, NextFunction } from 'express'
import { createUser, determineUserRole, getUser, getUsersDocs} from '../services/user.service'
import { IUser } from '../models/users'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../constants'


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const email = req.body.email;
        const role = determineUserRole(email);

        const userData: IUser = {
            username: req.body.username,
            password: hashedPassword,
            email: email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            role: role,
        };

        const createdUser: IUser = await createUser(userData);

        const token = jwt.sign(
            {
                email: createdUser.email,
                role: createdUser.role,
            },
            SECRET_KEY, 
            { expiresIn: "1h" }
        );

        res.status(201).json({
            createdUser,
            token,
        });

    } catch (err: any) {
        if (err.code === 11000) {
            res.status(400).json({ message: "Email or username already exists" });
        } else {
            res.status(500).json({ message: err.message || "Internal Server Error" });
        }
    }
};

export const loginUser = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {email, password} = req.body;
        const user: IUser | null = await getUser(email, password); 
        
        if(!user){
            res.status(400).json({message: "This user does not exist"});
            return;
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            res.status(400).json({message: "Invalid password"});
        }
    
        const token = jwt.sign(
            {
                email: user.email,
                role: user.role,
            },
            SECRET_KEY, 
            { expiresIn: "1h" }
        );

        res.status(200).json({
            user,
            token
        })
        
    }catch(err) {
        res.status(500).json({message: "An internal server error has occurred"});
    }

}


export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const usersData: Array<IUser> | null = await getUsersDocs();
        res.status(200).json(usersData);
    }catch(err){
        next(err);
    }
} 