const checkSoundIds = require('../usecases/checkSoundIds').checkSoundIds;
const SoundSet = require('../../data/model/soundSet');
const ServiceError = require('../../utils/serviceError');

exports.saveSoundSet = async (req) => {
    const name = req.body.name;
    const iconUrl = req.body.iconUrl;
    const soundIds = req.body.soundIds;

    if (await checkSoundIds(soundIds)) {
        const soundSet = new SoundSet(name, iconUrl, soundIds);
        return (await soundSet.save());
    } else {
        throw new ServiceError(400, 'sound ids were not found.');
    }
};
