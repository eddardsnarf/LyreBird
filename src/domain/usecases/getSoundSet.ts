import { ServiceError } from '../../utils/serviceError';
import { SoundSetRepository } from '../../data/repo/soundSetRepository';
import { ISoundSetSchema } from '../../data/model/soundSet';

export const getSoundSet = async (setId:string, soundSetRepo:SoundSetRepository): Promise<Array<ISoundSetSchema>> => {
    const soundSet = await soundSetRepo.fetchById(setId);
    if (soundSet !== undefined) {
        return soundSet;
    } else {
        throw new ServiceError(404, 'sound set not found.');
    }
};
