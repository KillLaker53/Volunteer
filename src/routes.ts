import express from 'express';
import { getUsers, getUser, registerUser } from './controllers/users.controller';
import { validateUserFields, checkIfUserExists } from './middleware/validate.user';
import { validateEventFields, checkIfEventExists } from './middleware/validate.event';
import { handleValidationResult } from './middleware/handle.validation.result';
import { createEvent } from './controllers/events.controller';

const routes = express.Router();

routes.post('/register', validateUserFields, handleValidationResult, checkIfUserExists, registerUser);

routes.get('/getUser', getUser);

routes.get('/getUsers', getUsers);

routes.post('/createEvent', validateEventFields, handleValidationResult, checkIfEventExists, createEvent);

export default routes;