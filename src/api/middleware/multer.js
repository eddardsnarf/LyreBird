const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const fileStorage = multer.diskStorage({
  destination: 'audio-files',
  filename: (req, file, callback) => {
    callback(null, `${crypto.randomBytes(12).toString('hex')}${path.extname(file.originalname)}`);
  }
});

const multerFilter = (req, file, callback) => {
  if (file.mimetype === 'audio/mpeg') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const uploadFiles = multer({
  storage: fileStorage,
  fileFilter: multerFilter
}).array('soundFiles', 100);

module.exports = uploadFiles;
