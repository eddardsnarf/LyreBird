const fs = require('fs');
const path = require('path');
const rootDir = require('../../utils/path');
const ServiceError = require('../../utils/serviceError');

exports.getSoundFileById = async (soundId, soundRepo, callback) => {
    const sound = (await soundRepo.fetchById(soundId));
    const soundPath = path.join(rootDir, '..', sound.path);
    const rs = fs.createReadStream(soundPath);
    rs.on('error', (error) => {
        callback(new ServiceError(422, `couldnt find that specific file ${error}`));
    });
    return rs;
};
