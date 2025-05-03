import express from 'express';
import { getUser, getUsers, loginUser, registerUser, sendCertificate, updateProfileEmail, updateProfilePhone } from './controllers/users.controller';
import { validateUserFields, validateLoginFields, checkIfUserExists, validateJwtToken } from './middleware/validate.user';
import { validateEventFields, checkIfEventExists, validateEventIsActive, validateEventIsFinished } from './middleware/validate.event';
import { handleValidationResult } from './middleware/handle.validation.result';
import { addVolunteerToEvent, createEvent, event, eventsHomepage,  userEventDetails, removeVolunteerFromEvent } from './controllers/events.controller';
import { userDonationDetails, makeDonation } from './controllers/donations.controller';
import { removeUserFromEvent } from './services/events.service';

const routes = express.Router();

routes.post('/api/register', validateUserFields, handleValidationResult, checkIfUserExists, registerUser);

routes.post('/api/login', validateLoginFields, loginUser);

routes.get('/api/getUser', getUser);

routes.get('/api/getUsers', getUsers);

routes.post('/api/createEvent', validateJwtToken, validateEventFields, handleValidationResult, checkIfEventExists, createEvent);

routes.get('/api/event', event);

routes.get('/api/homepage/events', eventsHomepage);

routes.get('/api/profile/events', validateJwtToken, userEventDetails);

routes.post('/api/signForEvent', validateJwtToken, validateEventIsActive, addVolunteerToEvent);

routes.post('/api/unsignForEvent', validateJwtToken, validateEventIsActive, removeVolunteerFromEvent);

routes.get('/api/sendPdfToEmail', validateJwtToken, validateEventIsFinished, sendCertificate);

routes.post('/api/donate', validateJwtToken, makeDonation);

routes.get('/api/donations', validateJwtToken, userDonationDetails);

routes.put('/api/profile/updateEmail', validateJwtToken, updateProfileEmail);

routes.put('/api/profile/updatePhone', validateJwtToken, updateProfilePhone);

export default routes;