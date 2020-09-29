import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from 'express-jwt';

export default async (err: Error,
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> => {
    if (err !== null && err !== undefined) {
        if (err.name === 'UnauthorizedError') {
            res.status((err as UnauthorizedError).status).send(err.message);
            console.log(err);
        } else {
            res.status(500).send(err.message);
        }
        return;
    }

    next();
};
