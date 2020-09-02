const checkUploadedFile = require('../../domain/usecases/checkUploadedFile');
const Sound = require('../../data/model/sound');
const ServiceError = require('../../utils/serviceError');

exports.postSounds = (req, res) => {
  const soundFile = req.file;
  const soundName = req.body.name;
  const soundPath = soundFile.path;
  try {
    const checkResult = checkUploadedFile(soundFile);
    const sound = new Sound(soundName, soundPath);
    sound
      .save()
      .then(() => {
        res
          .status(checkResult.code)
          .send(checkResult.msg);
      }).catch((error) => {
        res
          .status(500)
          .send(error);
      });
  } catch (serviceError) {
    if (serviceError instanceof ServiceError) {
      res
        .status(serviceError.code)
        .send(serviceError.msg);
    } else {
      console.log(serviceError);
    }
  }
};
