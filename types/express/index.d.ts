import { IUserSchema } from '../../src/data/model/user';
import { AuthTokenData } from '../../src/data/repo/authRepository';

declare global {
    namespace Express {
        interface Request {
            token?: AuthTokenData;
            currentUser?: IUserSchema;
        }
    }
}
