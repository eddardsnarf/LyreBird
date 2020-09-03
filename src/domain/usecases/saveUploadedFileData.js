const Sound = require('../../data/model/sound');

exports.saveFiles = async (files) => {
  const sounds = files.map((file) => new Sound(file.originalname, file.path));
  return Object.values((await Sound.save(sounds)).insertedIds);
};
