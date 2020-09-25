import { Request, Response, NextFunction } from 'express';
import User from '../../data/model/user';

export default async (req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const token = req.token;
        if (token !== null && token !== undefined) {
            const decodedUser = JSON.parse(token).data;
            const user = await User.findOne({ _id: decodedUser._id });
            if (!user) {
                res.status(401).send();
            } else {
                req.currentUser = user;
                return next();
            }
        }
    } catch (e) {
        res.json(e).status(500).send();
    }
};

