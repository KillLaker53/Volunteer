import express from 'express';
import { getUsers, getUser, registerUser } from './controllers/users.controller';
import { validateUserFields, checkIfUserExists } from './middleware/validate.user';
import { validateEventFields, checkIfEventExists } from './middleware/validate.event';
import { handleValidationResult } from './middleware/handle.validation.result';
import { createEvent, getEvents } from './controllers/events.controller';

const routes = express.Router();

routes.post('/api/register', validateUserFields, handleValidationResult, checkIfUserExists, registerUser);

routes.get('/api/getUser', getUser);

routes.get('/api/getUsers', getUsers);

routes.post('/api/createEvent', validateEventFields, handleValidationResult, checkIfEventExists, createEvent);

routes.get('/api/getEvents', getEvents)

export default routes;