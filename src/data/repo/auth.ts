import argon from 'argon2';
import UserModel, { IUserSchema } from '../model/user';
import jwt from 'jsonwebtoken';
import { ServiceError } from '../../utils/serviceError';

export const SECRET = 'm1h41is1337kthxbbq';// TODO this should be an environment variable.

interface AuthResult {
    user: { email: string; name: string; };
    token: string
}

export default class AuthRepository {
    public login = async (email: string, password: string): Promise<AuthResult> => {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new ServiceError(404, 'user not found');
        } else {
            const correctPassword = await argon.verify(user.password, password);
            if (!correctPassword) {
                throw new ServiceError(400, 'password incorrect');
            }
        }

        return {
            user: {
                email: user.email,
                name: user.name,
            },
            token: this.generateJWT(user),
        };
    }

    public register = async (email: string, password: string, name: string): Promise<AuthResult> => {
        const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z0-9]+$/;
        if (!emailRegex.test(email)) {
            throw new ServiceError(400, 'email not valid');
        }
        const passwordHashed = await argon.hash(password);
        const user = await UserModel.create({
            password: passwordHashed,
            email,
            name
        });
        return {
            user: {
                email: user.email,
                name: user.name
            },
            token: this.generateJWT(user)
        };
    }

    private generateJWT = (user: IUserSchema) => {
        return jwt.sign({
            data: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        },
        SECRET,
        { expiresIn: '6h' });
    }
}

