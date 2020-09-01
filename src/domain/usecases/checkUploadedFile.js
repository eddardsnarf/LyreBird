const ServiceError = require('../../utils/serviceError');

module.exports = (soundFile) => {
  if (!soundFile) {
    throw new ServiceError(422, 'sound file not a file');
  } else {
    return { code: 200, msg: 'Uploaded succesful' };
  }
};
