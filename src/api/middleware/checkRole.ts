import { NextFunction, Request, Response } from 'express';

export default (requiredRole: string) => (req: Request, res: Response, next: NextFunction): void => {
    console.log('Required role?');
    if (req.currentUser?.role !== requiredRole) {
        res.status(403).send();
    } else {
        console.log('User meet required role, going to next middleware');
        next();
    }
};
