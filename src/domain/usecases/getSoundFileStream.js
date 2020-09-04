const fs = require('fs');
const path = require('path');
const rootDir = require('../../utils/path');
const Sound = require('../../data/model/sound');
const ServiceError = require('../../utils/serviceError');

exports.getSoundFileStream = async (soundId, callback) => {
  const sound = (await Sound.fetchById(soundId));
  const soundPath = path.join(rootDir, '..', sound.path);
  const rs = fs.createReadStream(soundPath);
  rs.on('error', (error) => {
    callback(new ServiceError(422, `couldnt find that specific file ${error}`));
  });
  return rs;
};
