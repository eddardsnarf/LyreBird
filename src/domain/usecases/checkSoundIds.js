const Sound = require('../../data/model/sound');

exports.checkSoundIds = async (soundIds) => {
    const sounds = await Sound.get(soundIds);
    return sounds.length === soundIds.length;
};

