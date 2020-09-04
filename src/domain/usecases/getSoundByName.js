const Sound = require('../../data/model/sound');
const ServiceError = require('../../utils/serviceError');

exports.getSoundFileByName = async (soundName) => {
    const sounds = (await Sound.fetchByName(soundName));
    if (sounds !== undefined && sounds.length > 0) {
        return sounds;
    } else {
        throw new ServiceError(404, 'sound name not found.')
    }
};