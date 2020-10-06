import argon from 'argon2';
import UserModel, { IUserSchema } from '../model/user';
import jwt from 'jsonwebtoken';
import { ServiceError } from '../../utils/serviceError';
import { emailRegex, SECRET } from '../../utils/constants';

export interface LoginResult {
    token: string
}

export interface RegisterResult {
    email: string;
    name: string;
}

export interface AuthTokenData {
    data: {
        _id: string,
        name: string,
        email: string
    }
}

export default class AuthRepository {
    public login = async (email: string, password: string): Promise<LoginResult> => {
        const user = await UserModel.findOne({ email: { $eq: email } });
        if (!user) {
            throw new ServiceError(400, 'user not found');
        } else {
            const correctPassword = await argon.verify(user.password, password);
            if (!correctPassword) {
                throw new ServiceError(400, 'password incorrect');
            }
        }
        return {
            token: this.generateJWT(user),
        };
    }

    public register = async (email: string, password: string, name: string): Promise<RegisterResult> => {
        if (!emailRegex.test(email)) {
            throw new ServiceError(400, 'email not valid');
        }
        const dbUser = await UserModel.findOne({ email: { $eq: email } });
        if (dbUser){
            throw new ServiceError(400,'user already exists');
        }
        const passwordHashed = await argon.hash(password);
        const user = await UserModel.create({
            password: passwordHashed,
            email,
            name
        });
        return {
            email: user.email,
            name: user.name
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

