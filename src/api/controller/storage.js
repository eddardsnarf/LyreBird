const getSoundFileStream = require('../../domain/usecases/getSoundFileStream');

exports.getSoundFile = (req, res) => {
  const errorHandler = (serviceError) => {
    res
      .status(serviceError.code)
      .send(serviceError.msg);
  };

  const soundFileStream = getSoundFileStream(req.body.fileId, errorHandler);
  res.setHeader('Content-Type', 'audio/mpeg');
  soundFileStream.pipe(res);
};
