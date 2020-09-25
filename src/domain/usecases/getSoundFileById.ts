import fs from 'fs';
import path from 'path';
import { rootDir } from '../../utils/constants';
import { ServiceError } from '../../utils/serviceError';
import { SoundRepository } from '../../data/repo/soundRepository';

export const getSoundFileById = async (
    soundId: string,
    soundRepo: SoundRepository,
    callback: (err: ServiceError) => void
): Promise<fs.ReadStream> => {
    const sound = (await soundRepo.fetchById(soundId));
    const soundPath = path.join(rootDir, '..', sound.path);
    const rs = fs.createReadStream(soundPath);
    rs.on('error', (error) => {
        callback(new ServiceError(422, `couldnt find that specific file ${error}`));
    });
    return rs;
};
