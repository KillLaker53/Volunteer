import { body } from 'express-validator';

export const validateDonationFields = [
    body('donator').isMongoId(),
    body('event').isMongoId(),
    body('amount').isNumeric(),
    body('date').isDate(),

];