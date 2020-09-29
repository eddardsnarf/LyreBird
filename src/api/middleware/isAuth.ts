import jwt from 'express-jwt';
import { Request } from 'express';
import { SECRET } from '../../utils/constants';

const getTokenFromHeader = (req: Request) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
};

export default jwt({
    secret: SECRET,
    algorithms: ['HS256'],
    userProperty: 'token', // this is where the next middleware can find the encoded data generated in services/auth:generateToken
    getToken: getTokenFromHeader,
});
