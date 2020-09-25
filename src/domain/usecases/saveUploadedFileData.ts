import { ISoundSchema } from '../../data/model/sound';
import { SoundRepository } from '../../data/repo/soundRepository';

export const saveFiles = async (
    files: Array<Express.Multer.File>,
    soundRepo: SoundRepository
): Promise<Array<ISoundSchema>> => {
    const sounds = files.map((file) => ({ name: file.originalname, path: file.path }) as ISoundSchema);
    return await soundRepo.save(sounds);
};
