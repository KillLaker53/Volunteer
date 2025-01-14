import express from 'express';
import { getUser, getUsers, loginUser, registerUser } from './controllers/users.controller';
import { validateUserFields, checkIfUserExists, validateJwtToken } from './middleware/validate.user';
import { validateEventFields, checkIfEventExists } from './middleware/validate.event';
import { handleValidationResult } from './middleware/handle.validation.result';
import { addVolunteerToEvent, createEvent, getEvent, getEventsHomepage, getUserEventDetails } from './controllers/events.controller';

const routes = express.Router();

routes.post('/api/register', validateUserFields, handleValidationResult, checkIfUserExists, registerUser);

routes.post('/api/login', loginUser);

routes.get('/api/getUser', getUser);

routes.get('/api/getUsers', getUsers);

routes.post('/api/createEvent', validateEventFields, handleValidationResult, checkIfEventExists, createEvent);

routes.get('/api/getEvent', getEvent);

routes.get('/api/homepage/getEvents', getEventsHomepage);

routes.get('/api/profile/getEvents', getUserEventDetails);

routes.post('/api/signForEvent', addVolunteerToEvent);

export default routes;