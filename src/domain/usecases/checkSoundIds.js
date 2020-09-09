exports.checkSoundIds = async (soundIds, soundRepo) => {
    const sounds = await soundRepo.fetchByIds(soundIds);
    return sounds.length === soundIds.length;
};
