const ServiceError = require('../../utils/serviceError');

exports.getSoundSet = async (setId, soundSetRepo) => {
    const soundSet = await soundSetRepo.fetchById(setId);
    if (soundSet !== undefined) {
        return soundSet;
    } else {
        throw new ServiceError(404, 'sound set not found.');
    }
};
