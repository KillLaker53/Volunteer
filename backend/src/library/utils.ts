import { Location } from "./types";
import { NODEMAILER_EMAIL, NODEMAILER_PASSWORD, OPENCAGE_API_KEY, SECRET_KEY } from "./constants";
import OpenCage  from 'opencage-api-client';
import PDFDocument from 'pdfkit';
import jwt from 'jsonwebtoken'
import { IEvent } from "../models/events";
import mongoose, { ObjectId } from "mongoose";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: NODEMAILER_EMAIL,
            pass: NODEMAILER_PASSWORD,
        }
});


export const geocodeLocation = async(address: string):Promise<Location> => {
    try{
        const response = await OpenCage.geocode({
                q: address, 
                key: OPENCAGE_API_KEY,
                countrycode: 'bg',
                limit: 1,
        });
        if(response.results && response.results.length > 0){
            const result = response.results[0];

            const coordinates: [number, number] = [result.geometry.lat, result.geometry.lng]
            const location: Location = {
                type: 'Point',
                coordinates: coordinates,
            }
            return location;
        } else{
            throw new Error("Location not found");
        }

    }catch(err){
        throw new Error("Error fetching the address to a location");
    }
}

export const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1 ).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}.${month}.${year}`;
}

export const formatDateRange = (startDate: Date, endDate: Date) => {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}


export const generateCertificate = (
    userFirstName: string,
    userLastName: string,
    eventName: string,
    date: string
): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            size: 'A4',
            margin: 50,
        });

        const buffers: Buffer[] = [];
        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer); 
        });

        doc.on('error', (err) => reject(err)); 

        doc.fontSize(24).text('Certificate for Participation', { align: 'center' }).moveDown(1);
        doc.fontSize(20).text(`${userFirstName} ${userLastName} participated in event "${eventName}"`).moveDown(0.5);
        doc.fontSize(20).text(`During the period: ${date}`, { align: 'center' }).moveDown(0.5);

        doc.end();
    });
};

export const sendCertificateToEmail = async(
    userEmail: string, 
    userFirstName: string, 
    userLastName: string, 
    pdfCertificate: Buffer
) => {

    const mailOptions = {
        from: NODEMAILER_EMAIL,
        to: userEmail,
        subject: 'Your Certificate',
        text: '',
        attachments: [
            {
                filename: `certificate-${userFirstName}-${userLastName}.pdf`,
                content: pdfCertificate,
            },
        ],
    };
    await transporter.sendMail(mailOptions);
}

export const signJwt = async(userId: mongoose.Types.ObjectId, userEmail: string, userRole: string) => {
    return jwt.sign(
        {
            id: userId,
            email: userEmail,
            role: userRole,
        },
        SECRET_KEY, 
        { expiresIn: "1h" }
    );
}

export const sendEventNotification = async(event: IEvent, userEmail: string) => {
    try{
        const mailOptions = {
            from: NODEMAILER_EMAIL,
            to: userEmail,
            subject: 'New Event',
            text: `We would like to inform you about a new event ${event.eventName} at ${event.address}. If you would like to contribute to this event please visit the site`
        }
        await transporter.sendMail(mailOptions);
    }catch(err){
        throw new Error('Error trying to send email');
    }
}