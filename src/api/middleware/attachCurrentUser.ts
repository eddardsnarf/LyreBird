import { Request, Response, NextFunction } from 'express';
import User from '../../data/model/user';

export default async (req: Request,
    res: Response,
    next: NextFunction): Promise<void> => {
    try {
        const token = req.token;
        if (token !== null && token !== undefined) {
            const decodedUser = token.data;
            const user = await User.findOne({ _id: { $eq: decodedUser._id } }, { password:0, setIds: 0 });
            if (!user) {
                res.status(401).send();
            } else {
                req.currentUser = user;
                next();
            }
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

