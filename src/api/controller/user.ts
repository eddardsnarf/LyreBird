import { Request, Response } from 'express';
import AuthRepository from '../../data/repo/auth';
import { ServiceError } from '../../utils/serviceError';

export default class UserController {
    private readonly authRepository: AuthRepository;

    public constructor () {
        this.authRepository = new AuthRepository();
    }

    public loginUser = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;
        try {
            const token = await this.authRepository.login(email, password);
            res.status(200)
                .send(token);
        } catch (e) {
            if (e instanceof ServiceError) {
                res
                    .status(400)
                    .send('combo of user and password is wrong.');
            } else {
                res.status(500)
                    .send(e);
            }
        }
    }

    public registerUser = async (req: Request, res: Response): Promise<void> => {
        const { name, email, password } = req.body;
        try {
            const user = await this.authRepository.register(email, password, name);
            res.status(200)
                .send(user);
        } catch (e) {
            if (e instanceof ServiceError) {
                res.status(e.code)
                    .send(e.msg);
            } else {
                res
                    .status(500)
                    .send(e);
            }
        }
    }

    public getUser = async (req: Request, res: Response): Promise<void> => {
        const user = req.currentUser;
        if (!user) {
            res.status(400).send();
        } else {
            res.status(200)
                .send({ name: user.name, email: user.email, role: user.role });
        }

    }
}
