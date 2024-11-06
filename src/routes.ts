import express from 'express';
import { getUsers, getUser, createUser } from './controllers/users.controller'

const routes = express.Router();

routes.post('/createUser', createUser);

routes.get('/getUser', getUser);

routes.get('/getUsers', getUsers);

export default routes;