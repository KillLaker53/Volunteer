import { Request, Response, NextFunction } from 'express'
import { createUser, getUserByEmail, getUserDoc, getUsersDocs, updateProfileField, updateProfileRoleDoc} from '../services/user.service'
import { IUser } from '../models/users'
import bcrypt from 'bcryptjs'
import { UserDto } from 'types-api-volunteer/src'
import { getEventDoc } from '../services/events.service'
import { generateCertificate, sendCertificateToEmail, signJwt } from '../library/utils'
import { UserRole } from '../library/types'


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const email = req.body.email;
        const role = UserRole.Volunteer;

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
        const token = await signJwt(user._id, user.email, user.role);
        
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
        const userId = req.params.userId;
        
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
        const userId = res.locals.token.id;
        const eventId = req.body.eventId;
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

export const updateProfile = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = res.locals.token.id;
        const updates = req.body;
        if(!userId || !updates || Array.isArray(updates)){
            res.status(400).json({message: "Invalid update request"});
            return;
        }

        await updateProfileField(userId, updates);
        res.status(200).json({message: "Successfully updated email"});
        return;
    }catch(err){
        console.error(err);
        res.status(500).json({message: "An internal server error has occurred"});
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