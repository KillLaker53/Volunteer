import mongoose, { mongo } from 'mongoose';
import { DB } from "./config";
import process from 'process';

const options: mongoose.ConnectOptions = {

}


mongoose.set('strictQuery', true);

const mongoURI = DB.URI ? DB.URI : DB.USERNAME && DB.PASSWORD 
                ? `mongodb+srv://${DB.USERNAME}:${DB.PASSWORD}@${DB.HOST}/${DB.NAME}` 
                : `mongodb://${DB.HOST}:${DB.PORT}/${DB.NAME}`;



export function connectToDb(callBankFunc: () => Promise<void>, disconnect: boolean): void {
    mongoose.connect(mongoURI, options)

    const db = mongoose.connection;

    db.on('error', () => {
        console.error.bind(console, 'connection error');
        process.kill(process.pid, 'SIGTERM');
    });

    db.once('open', async () => {
        await callBankFunc();
        if(disconnect){
            db.close().catch((err) => {
                console.log(err);
            })
        }
    });

}


export default { connectToDb };

