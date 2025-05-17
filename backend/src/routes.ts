import express from 'express';
import { getUser, getUsers, loginUser, registerUser, sendCertificate, updateProfile, updateProfilePhone, updateProfileRole } from './controllers/users.controller';
import { validateUserFields, validateLoginFields, checkIfUserExists, validateJwtToken, validateUserCredentials, validateAdminRole } from './middleware/validate.user';
import { validateEventFields, checkIfEventExists, validateEventIsActive, validateEventIsFinished } from './middleware/validate.event';
import { handleValidationResult } from './middleware/handle.validation.result';
import { addVolunteerToEvent, createEvent, getEvent, removeVolunteerFromEvent, getEventsHomepage, getUserEventDetails, getEventsByName } from './controllers/events.controller';
import { makeDonation, getUserDonationDetails } from './controllers/donations.controller';

const routes = express.Router();

routes.post('/api/register', validateUserFields, handleValidationResult, checkIfUserExists, registerUser);

routes.post('/api/login', validateUserCredentials, validateLoginFields, loginUser);

routes.get('/api/users/:userId', getUser);

routes.get('/api/users', getUsers);

routes.post('/api/events', validateJwtToken, validateEventFields, handleValidationResult, checkIfEventExists, createEvent);

routes.get('/api/events/search', getEventsByName);

routes.get('/api/events/:eventId', getEvent);

routes.get('/api/homepage/events', getEventsHomepage);

routes.get('/api/users/me/events', validateJwtToken, getUserEventDetails);

routes.post('/api/events/:eventId/volunteers', validateJwtToken, validateEventIsActive, addVolunteerToEvent);

routes.delete('/api/events/:eventId/volunteers', validateJwtToken, validateEventIsActive, removeVolunteerFromEvent);

routes.post('/api/users/me/certificate-email', validateJwtToken, validateEventIsFinished, sendCertificate);

routes.post('/api/donate', validateJwtToken, makeDonation);

routes.get('/api/donations', validateJwtToken, getUserDonationDetails);



routes.patch('/api/users/:userId/role', validateAdminRole, updateProfileRole);

routes.patch('/api/events/:eventId/approval', validateAdminRole);

routes.patch('/api/users/update', validateJwtToken, updateProfile)

export default routes;