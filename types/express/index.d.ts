import { IUserSchema } from '../../src/data/model/user';

declare global {
    namespace Express {
        interface Request {
            token?: string;
            currentUser?: IUserSchema;
        }
    }
}
