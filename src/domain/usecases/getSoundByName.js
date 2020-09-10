const ServiceError = require('../../utils/serviceError');

exports.getSoundFileByName = async (soundName, page, limit, soundRepo) => {
    const sounds = (await soundRepo.fetchByName(soundName, page, limit));
    if (sounds !== undefined && sounds.length > 0) {
        return sounds;
    } else {
        throw new ServiceError(404, 'sound name not found.');
    }
};
