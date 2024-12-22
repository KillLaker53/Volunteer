import express, { Express } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
dotenv.config();

import mongoose from './config/mongoose';
import routes from './routes'
import { PORT } from "./config/config";


const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(routes);

mongoose.connectToDb(() => afterConnect(app), false);


let server: http.Server;

app.on('ready', () => {
    server = app.listen(PORT)
    console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
    if (server) {
      server.close();
    }
  });

async function afterConnect(app: Express): Promise<void>{
    app.emit('ready');
}