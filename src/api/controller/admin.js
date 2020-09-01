const checkUploadedFile = require('../../services/usecases/checkUploadedFile');

exports.postSoundFile = (req, res) => {
  const soundFile = req.file;
  try {
    const result = checkUploadedFile(soundFile);
    res
      .status(result.code)
      .send(result.msg);
  } catch (serviceError) {
    res
      .status(serviceError.code)
      .send(serviceError.msg);
  }
};
