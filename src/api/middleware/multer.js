const multer = require('multer');

const fileStorage = multer.diskStorage({
  destination: 'audio-files',
  filename: (req, file, callback) => {
    callback(null, `${file.originalname}`);
  }
});

const multerFilter = (req, file, callback) => {
  if (file.mimetype === 'audio/mpeg') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

module.exports = multer({
  storage: fileStorage,
  fileFilter: multerFilter
}).single('soundFile');
