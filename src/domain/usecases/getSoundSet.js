const ServiceError = require('../../utils/serviceError');
const SoundSet = require('../../data/model/soundSet');

exports.getSoundSet = async (setId) => {
    const soundSet = await SoundSet.fetchById(setId);
    if (soundSet !== undefined) {
        return soundSet;
    } else {
        throw new ServiceError(404, 'sound set not found.');
    }
};