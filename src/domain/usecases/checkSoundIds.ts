import { SoundRepository } from '../../data/repo/soundRepository';

export const checkSoundIds = async (soundIds: Array<string>, soundRepo: SoundRepository): Promise<boolean> => {
    const sounds = await soundRepo.fetchByIds(soundIds);
    return sounds.length === soundIds.length;
};
