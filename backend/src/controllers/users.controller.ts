import { Request, Response, NextFunction } from 'express'
import { createUser, determineUserRole, getUserByEmail, getUserDoc, getUsersDocs} from '../services/user.service'
import { IUser } from '../models/users'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../constants'
import { UserDto } from 'types-api-volunteer/src'
import { getEventDoc } from '../services/events.service'
import { generateCertificate, sendCertificateToEmail } from '../library/utils'


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
            events: [],
            role: role,
        };

        const createdUser = await createUser(userData);

        const token = jwt.sign(
            {
                id: createdUser._id.toString(),
                email: createdUser.email,
                role: createdUser.role,
            },
            SECRET_KEY, 
            { expiresIn: "1h" }
        );
        const data = createdUser;
        res.status(201).json({
            token,
            data
        });

    } catch (err: any) {
        if (err.code === 11000) {
            res.status(400).json({ message: "Email or username already exists" });
            return;
        } else {
            res.status(500).json({ message: err.message || "Internal Server Error" });
            return;
        }
    }
};

export const loginUser = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {email, password} = req.body;
        const user = await getUserByEmail(email); 
        
        if(!user){
            res.status(400).json({message: "This user does not exist"});
            return;
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid){
            res.status(400).json({message: "Invalid password"});
            return;
        }
        const data = user;
        const token = jwt.sign(
            {
                id: user._id.toString(),
                email: user.email,
                role: user.role,
            },
            SECRET_KEY, 
            { expiresIn: "1h" }
        );

        res.status(200).json({
            token,
            data
        });
        return;
        
    }catch(err) {
        res.status(500).json({message: "An internal server error has occurred"});
        return;
    }

}


export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const usersData: Array<IUser> | null = await getUsersDocs();
        res.status(200).json(usersData);
        return;
    }catch(err){
        next(err);
    }
} 

export const getUser = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.query.userId as string;

        if(!userId){
            res.status(404).json({message: "Missing required query parameter"});
            return;
        }
        const user: UserDto = await getUserDoc(userId);
        res.status(201).json(user);
        return;
    }catch(err){
        res.status(500).json({message: "An internal server error has occurred"});
        return;
    }
}

export const sendCertificate = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.query.userId as string;
        const eventId = req.query.eventId as string;
        const user = await getUserDoc(userId);
        const event = await getEventDoc(eventId);
        console.log(user);
        console.log(event);
        const pdfCertificate = await generateCertificate(user.firstName, user.lastName, event.eventName, event.date);
        
        await sendCertificateToEmail(user.email, user.firstName, user.lastName, pdfCertificate);
        res.status(201).json({message: "Successfully sent certificate"});
    }catch(err){
        console.error(err);
        res.status(500).json({message: "An internal server error has occurred"});
        return;
    }
}