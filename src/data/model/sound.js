const SOUND_COLLECTION_NAME = 'sounds';
const mongodb = require('mongodb');
const getDb = require('../db/database').getDb;

class Sound {
    constructor(name, path) {
        this.name = name;
        this.path = path;
    }

    async save() {
        const db = getDb();
        const savedSoundResult = await db.collection(SOUND_COLLECTION_NAME)
            .insertOne(this);
        console.log(savedSoundResult);
        return savedSoundResult.ops[0];
    }

    static async save(sounds) {
        const db = getDb();
        const savedSoundsResult = await db.collection(SOUND_COLLECTION_NAME)
            .insertMany(sounds);
        console.log(savedSoundsResult);
        return savedSoundsResult.ops;
    }

    static async fetchByName(name) {
        const db = getDb();
        const sounds = await db.collection(SOUND_COLLECTION_NAME)
            .find({
                name: {$regex: ".*" + name + ".*"}
            }).toArray();
        console.log(sounds);
        return sounds;
    }

    static async fetchById(id) {
        return (await this.fetchByIds([id]))[0];
    }

    static async fetchByIds(ids) {
        const db = getDb();
        const sounds = await db.collection(SOUND_COLLECTION_NAME)
            .find({
                _id: {
                    $in: ids.map((id) => new mongodb.ObjectID(id))
                }
            }).toArray();
        console.log(sounds);
        return sounds;
    }
}

module.exports = Sound;
