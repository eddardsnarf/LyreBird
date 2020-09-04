const SOUND_COLLECTION_NAME = 'sounds';
const mongodb = require('mongodb');
const getDb = require('../db/database').getDb;

class Sound {
    constructor(name, path) {
        this.name = name;
        this.path = path;
    }

    save() {
        const db = getDb();
        return db.collection(SOUND_COLLECTION_NAME)
            .insertOne(this)
            .then((res) => {
                console.log(res);
                return res;
            }).catch((err) => {
                console.log(err);
            });
    }

    static save(sounds) {
        const db = getDb();
        return db.collection(SOUND_COLLECTION_NAME)
            .insertMany(sounds)
            .then((res) => {
                console.log(res);
                return res;
            }).catch((err) => {
                console.log(err);
            });
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
