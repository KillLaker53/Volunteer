import express, { Express } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
dotenv.config();

import mongoose from './config/mongoose';
import router from './routes'
import { PORT } from "./config/config";


const app = express();

mongoose.connectToDb(() => afterConnect(app), false);

app.use(cors());
app.use(express.json());
app.use(router);

let server: http.Server | undefined;

app.on('ready', () => {
    server = app.listen(PORT, )
});

async function afterConnect(app: Express): Promise<void>{
    app.emit('ready');
}