const Sound = require('../../data/model/sound');

exports.saveFiles = async (files, soundRepo) => {
    const sounds = files.map((file) => new Sound(file.originalname, file.path));
    return Object
        .values(await soundRepo.save(sounds))
        .map((sound) => ({ _id: sound._id, name: sound.name }));
};
