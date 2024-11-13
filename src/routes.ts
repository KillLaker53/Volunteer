import express from 'express';
import { getUsers, getUser, registerUser } from './controllers/users.controller';
import { validateUserFields, checkIfUserExists } from './middleware/validate.user';
import { handleValidationResult } from './middleware/handle.validation.result';

const routes = express.Router();

routes.post('/register', validateUserFields, handleValidationResult, checkIfUserExists, registerUser);

routes.get('/getUser', getUser);

routes.get('/getUsers', getUsers);

export default routes;