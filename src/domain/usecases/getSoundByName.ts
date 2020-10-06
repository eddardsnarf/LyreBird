import { SoundRepository } from '../../data/repo/soundRepository';
import { ServiceError } from '../../utils/serviceError';
import { ISoundSchema } from '../../data/model/sound';

export const getSoundFileByName = async (
    soundName: string,
    page: number,
    limit: number,
    soundRepo: SoundRepository
): Promise<Array<ISoundSchema>> => {
    const sounds = (await soundRepo.fetchByName(soundName, page, limit));
    if (sounds !== undefined) {
        return sounds;
    } else {
        throw new ServiceError(404, 'sound name not found.');
    }
};
