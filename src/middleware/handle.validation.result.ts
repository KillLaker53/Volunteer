import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"

export const handleValidationResult = async(req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(500).json({errors: errors.array()});
        return;
    }

    next();
}