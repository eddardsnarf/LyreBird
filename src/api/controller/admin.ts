import { Request, Response } from 'express';
import { saveFiles } from '../../domain/usecases/saveUploadedFileData';
import { saveSoundSet } from '../../domain/usecases/saveSoundSet';
import { checkFileUpload } from '../../domain/usecases/checkFileUpload';
import { ServiceError } from '../../utils/serviceError';
import { SoundRepository } from '../../data/repo/soundRepository';
import { SoundSetRepository } from '../../data/repo/soundSetRepository';

export class AdminController {
    private readonly soundRepo: SoundRepository;
    private readonly soundSetRepo: SoundSetRepository;

    public constructor () {
        this.soundRepo = new SoundRepository();
        this.soundSetRepo = new SoundSetRepository();
    }

    public postSounds = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log(req.files);
            checkFileUpload(req);
            const insertedSounds = await saveFiles(req.files as Array<Express.Multer.File>, this.soundRepo);

            res.status(200)
                .send(insertedSounds);
        } catch (error) {
            console.log(error);
            if (error instanceof ServiceError) {
                res.status(error.code)
                    .send(error.message);
            } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
                res.status(400)
                    .send('Too many files to upload.');
            } else {
                res.status(400)
                    .send(`Error when trying upload many files: ${error}`);
            }
        }
    }

    public postSoundSet = async (req: Request, res: Response): Promise<void> => {
        try {
            const soundSet = await saveSoundSet(req, this.soundRepo, this.soundSetRepo);
            res.status(200)
                .send(soundSet);
        } catch (err) {
            console.log(err);
            if (err instanceof ServiceError) {
                res.status(err.code)
                    .send(err.message);
            } else {
                res.status(500)
                    .send(err);
            }
        }
    }
}
