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

    static get(ids) {
        const db = getDb();
        return db.collection(SOUND_COLLECTION_NAME)
            .find({
                _id: {
                    $in: ids.map((id) => new mongodb.ObjectID(id))
                }
            }).toArray()
            .then((sounds) => {
                console.log(sounds);
                return sounds;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = Sound;
