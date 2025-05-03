import { Request, Response, NextFunction } from 'express'
import { createUser, determineUserRole, getUserByEmail, getUserDoc, getUsersDocs, updateEmailProfileDoc, updatePhoneProfileDoc, updateProfileRoleDoc} from '../services/user.service'
import { IUser } from '../models/users'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../library/constants'
import { UserDto } from 'types-api-volunteer/src'
import { getEventDoc } from '../services/events.service'
import { generateCertificate, sendCertificateToEmail, signJwt } from '../library/utils'


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

        const token = signJwt(createdUser._id, createdUser.email, createdUser.role);
        res.status(201).json({
            token
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
        
        const user = res.locals.user;
        const token = signJwt(user._id, user.email, user.role);
        res.status(200).json({
            token
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
        const pdfCertificate = await generateCertificate(user.firstName, user.lastName, event.eventName, event.date);
        
        await sendCertificateToEmail(user.email, user.firstName, user.lastName, pdfCertificate);
        res.status(201).json({message: "Successfully sent certificate"});
    }catch(err){
        console.error(err);
        res.status(500).json({message: "An internal server error has occurred"});
        return;
    }
}

export const updateProfileEmail = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.body.userId;
        const newEmail = req.body.email;
        await updateEmailProfileDoc(userId, newEmail);
        res.status(201).json({message: "Successfully updated email"});
    }catch(err){
        console.error(err);
        res.status(500).json({message: "An internal server error has occurred"});
        return;
    }
}

export const updateProfilePhone = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.body.userId;
        const newPhone = req.body.phone;
        await updatePhoneProfileDoc(userId, newPhone);
        res.status(200).json({message: "Successfully updated phone"});
    }catch(err){
        console.error(err);
        res.status(500).json({message: "An internal error has occurred"});
        return;
    }
}

export const updateProfileRole = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.body.userId;
        const newRole = req.body.newRole;
        await updateProfileRoleDoc(userId, newRole);
        res.status(200).json({message: "User role updated successfully"});
    }catch(err){
        console.error(err);
        res.status(500).json({message: "An internal error has occurred"});
    }
}