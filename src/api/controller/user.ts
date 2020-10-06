import { Request, Response } from 'express';
import AuthRepository from '../../data/repo/authRepository';
import { ServiceError } from '../../utils/serviceError';
import UserRepository from '../../data/repo/userRepository';
import { login } from '../../domain/usecases/login';
import { register } from '../../domain/usecases/register';
import { favouriteSet, unfavouriteSet } from '../../domain/usecases/favouriteSet';
import { getFavourites } from '../../domain/usecases/getFavourites';

export default class UserController {
    private readonly authRepository: AuthRepository;
    private readonly userRepository: UserRepository;

    public constructor () {
        this.authRepository = new AuthRepository();
        this.userRepository = new UserRepository();
    }

    public loginUser = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;
        try {
            const token = await login(email, password, this.authRepository);
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
            const user = await register(email, password, name, this.authRepository);
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

    public favouriteSoundSet = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.currentUser;
            const setId = req.body?.setId;
            if (!user || !setId) {
                res.status(403).send('bad request');
            } else {
                const favourite = await favouriteSet(user._id, setId, this.userRepository);
                res.status(200).send(favourite);
            }
        } catch (e) {
            res.status(500).send('chernobyl happened komrade!');
        }
    };

    public unfavouriteSoundSet = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.currentUser;
            const setId = req.params.setId;
            if (!user || !setId) {
                res.status(403).send('bad request');
            } else {
                await unfavouriteSet(user._id, setId, this.userRepository);
                res.status(204).send();
            }
        } catch (e) {
            res.status(500).send('chernobyl happened komrade!');
        }
    };

    public getFavourites = async (req: Request, res: Response): Promise<void> => {
        try {

            const user = req.currentUser;
            if (!user) {
                res.status(403).send('bad request');
            } else {
                const favourites = await getFavourites(user._id, this.userRepository);
                res.status(200).send(favourites);
            }
        } catch (e) {
            res.status(500).send('chernobyl happened komrade!');
        }
    };
}
