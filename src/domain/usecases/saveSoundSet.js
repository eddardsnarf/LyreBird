const checkSoundIds = require('../usecases/checkSoundIds').checkSoundIds;
const ServiceError = require('../../utils/serviceError');

exports.saveSoundSet = async (req, soundRepo, soundSetRepo) => {
    const name = req.body.name;
    const iconUrl = req.body.iconUrl;
    const soundIds = req.body.soundIds;

    if (await checkSoundIds(soundIds, soundRepo)) {
        const soundSet = { name, iconUrl, soundIds };
        return (await soundSetRepo.save(soundSet));
    } else {
        throw new ServiceError(400, 'sound ids were not found.');
    }
};
