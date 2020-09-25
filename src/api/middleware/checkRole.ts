import { NextFunction, Request, Response } from 'express';

export default (requiredRole:string) => {
    return (req:Request, res:Response, next:NextFunction) => {
        console.log('Required role?');
        if (req.currentUser?.role !== requiredRole) {
            return res.status(401).end();
        } else {
            console.log('User meet required role, going to next middleware');
            return next();
        }
    };
};
