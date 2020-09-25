import { Request } from 'express';
import { checkSoundIds } from './checkSoundIds';
import { ServiceError } from '../../utils/serviceError';
import { SoundRepository } from '../../data/repo/soundRepository';
import { SoundSetRepository } from '../../data/repo/soundSetRepository';
import { ISoundSetSchema } from '../../data/model/soundSet';

export const saveSoundSet = async (req: Request, soundRepo: SoundRepository, soundSetRepo: SoundSetRepository): Promise<ISoundSetSchema> => {
    const name = req.body.name;
    const iconUrl = req.body.iconUrl;
    const soundIds = req.body.soundIds;

    if (await checkSoundIds(soundIds, soundRepo)) {
        const soundSet = { name, iconUrl, soundIds } as ISoundSetSchema;
        return (await soundSetRepo.save(soundSet));
    } else {
        throw new ServiceError(400, 'sound ids were not found.');
    }
};
