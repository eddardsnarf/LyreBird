import { Request, Response } from 'express';
import AuthRepository from '../../data/repo/auth';

export default class UserController {
    private readonly authService: AuthRepository;

    public constructor () {
        this.authService = new AuthRepository();
    }

    public loginUser = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body.user;
        try {
            const { user, token } = await this.authService.login(email, password);
            res.status(200)
                .json({ user, token })
                .send();
        } catch (e) {
            res.json(e)
                .status(500)
                .send();
        }
    }

    public registerUser = async (req: Request, res: Response): Promise<void> => {
        const { name, email, password } = req.body.user;
        try {
            const { user, token } = await this.authService.register(email, password, name);
            res.status(200)
                .json({ user, token })
                .send();
        } catch (e) {
            res.json(e)
                .status(500)
                .send();
        }
    }
}
