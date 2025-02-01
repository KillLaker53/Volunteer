import express from 'express';
import { getUser, getUsers, loginUser, registerUser, sendCertificate } from './controllers/users.controller';
import { validateUserFields, checkIfUserExists, validateJwtToken } from './middleware/validate.user';
import { validateEventFields, checkIfEventExists } from './middleware/validate.event';
import { handleValidationResult } from './middleware/handle.validation.result';
import { addVolunteerToEvent, createEvent, getEvent, getEventsHomepage, getUserEventDetails } from './controllers/events.controller';
import { getUserDonationDetails, makeDonation } from './controllers/donations.controller';

const routes = express.Router();

routes.post('/api/register', validateUserFields, handleValidationResult, checkIfUserExists, registerUser);

routes.post('/api/login', loginUser);

routes.get('/api/getUser', getUser);

routes.get('/api/getUsers', getUsers);

routes.post('/api/createEvent', validateEventFields, handleValidationResult, checkIfEventExists, createEvent);

routes.get('/api/getEvent', getEvent);

routes.get('/api/homepage/getEvents', getEventsHomepage);

routes.get('/api/profile/getEvents', validateJwtToken, getUserEventDetails);

routes.post('/api/signForEvent', validateJwtToken, /*validate if event has ended */ addVolunteerToEvent);

routes.get('/api/sendPdfToEmail', validateJwtToken, /*validate if user participated in event*/sendCertificate);

routes.post('/api/donate', validateJwtToken, makeDonation);

routes.get('/api/donations', getUserDonationDetails);
export default routes;