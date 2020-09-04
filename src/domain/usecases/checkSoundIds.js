const Sound = require('../../data/model/sound');

exports.checkSoundIds = async (soundIds) => {
    const sounds = await Sound.fetchByIds(soundIds);
    return sounds.length === soundIds.length;
};

