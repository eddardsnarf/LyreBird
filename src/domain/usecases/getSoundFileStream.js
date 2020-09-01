const fs = require('fs');
const path = require('path');
const rootDir = require('../../utils/path');

const ServiceError = require('../../utils/serviceError');

module.exports = (fileId, callback) => {
  const pathToFile = path.join(rootDir, '..', 'audio-files', `${fileId}.mp3`);
  const rs = fs.createReadStream(pathToFile);

  rs.on('error', (error) => {
    callback(new ServiceError(422, `couldnt find that specific file ${error}`));
  });
  return rs;
};
