const Sound = require('../../data/model/sound');

module.exports = class SoundRepository {
    save = async (sounds) => {
        const savedSoundsResult = await Sound.insertMany(sounds);
        console.log(savedSoundsResult);
        return savedSoundsResult
            .map((doc) => doc.toObject());
    }

    fetchByName = async (name, page, limit) => {
        const soundsQuery = Sound.find({
            name: { $regex: '.*' + name + '.*', $options: 'i' }
        });
        if (limit > 0) {
            soundsQuery.limit(limit);
        }
        if (page > -1) {
            soundsQuery.skip(page * limit);
        }
        const sounds = await soundsQuery.exec();
        const soundObjs = sounds.map((doc) => doc.toObject());
        console.log(soundObjs);
        return soundObjs;
    }

    fetchById = async (id) => {
        return (await this.fetchByIds([id]))[0];
    }

    fetchByIds = async (ids) => {
        const sounds = await Sound.find({
            _id: {
                $in: ids
            }
        });
        const soundsResult = sounds.map((doc) => doc.toObject());
        console.log(soundsResult);
        return soundsResult;
    }
};
