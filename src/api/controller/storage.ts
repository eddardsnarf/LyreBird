import { Request, Response } from 'express';

import { ServiceError } from '../../utils/serviceError';
import { getSoundFileById } from '../../domain/usecases/getSoundFileById';
import { getSoundSet } from '../../domain/usecases/getSoundSet';
import { getSoundFileByName } from '../../domain/usecases/getSoundByName';

import { SoundRepository } from '../../data/repo/soundRepository';
import { SoundSetRepository } from '../../data/repo/soundSetRepository';

export class StorageController {
    private readonly soundRepo: SoundRepository;
    private readonly soundSetRepo: SoundSetRepository;

    public constructor () {
        this.soundRepo = new SoundRepository();
        this.soundSetRepo = new SoundSetRepository();
    }

    public searchByName = async (req: Request, res: Response): Promise<void> => {
        try {
            const q: string = req.query.q as string;
            const page = parseInt(req.query.page as string) || 0;
            const limit = parseInt(req.query.limit as string) || 20;
            const sounds = await getSoundFileByName(q, page, limit, this.soundRepo);
            res.status(200)
                .send(sounds);
        } catch (err) {
            if (err instanceof ServiceError) {
                res.status(err.code).send(err.message);
            } else {
                res.status(500).send(err);
            }
        }
    }

    public getSoundFile = async (req: Request, res: Response): Promise<void> => {
        const errorHandler = (serviceError: ServiceError) => {
            res
                .status(serviceError.code)
                .send(serviceError.msg);
        };
        const soundFileStream = await getSoundFileById(req.params.soundId, this.soundRepo, errorHandler);
        res.setHeader('Content-Type', 'audio/mpeg');
        soundFileStream.pipe(res);
    }

    public getSoundSet = async (req: Request, res: Response): Promise<void> => {
        try {
            const soundSet = await getSoundSet(req.params.setId, this.soundSetRepo);
            res.status(200)
                .send(soundSet);
        } catch (err) {
            if (err instanceof ServiceError) {
                res.status(err.code).send(err.message);
            } else {
                res.status(500).send(err);
            }
        }
    }
}
