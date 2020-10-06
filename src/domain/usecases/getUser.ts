import { Request } from 'express';
import { IUserSchema } from '../../data/model/user';

export const getUser = (req: Request): IUserSchema | undefined => {
    return req.currentUser;
};
