const SOUND_COLLECTION_NAME = 'sounds';
const mongodb = require('mongodb');

module.exports = class SoundRepository {
    constructor (db) {
        this.db = db;
    }

    save = async (sounds) => {
        const savedSoundsResult = await this.db().collection(SOUND_COLLECTION_NAME)
            .insertMany(sounds);
        console.log(savedSoundsResult);
        return savedSoundsResult.ops;
    }

    fetchByName = async (name) => {
        const sounds = await this.db().collection(SOUND_COLLECTION_NAME)
            .find({
                name: { $regex: '.*' + name + '.*', $options: 'i' }
            }).toArray();
        console.log(sounds);
        return sounds;
    }

    fetchById = async (id) => {
        return (await this.fetchByIds([id]))[0];
    }

    fetchByIds = async (ids) => {
        const sounds = await this.db().collection(SOUND_COLLECTION_NAME)
            .find({
                _id: {
                    $in: ids.map((id) => new mongodb.ObjectID(id))
                }
            }).toArray();
        console.log(sounds);
        return sounds;
    }
};
