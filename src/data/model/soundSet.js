const SOUND_SET_COLLECTION_NAME = 'soundSets';
const mongodb = require('mongodb');
const getDb = require('../db/database').getDb;

class SoundSet {
    constructor(name, iconUrl, soundIds) {
        this.name = name;
        this.iconUrl = iconUrl;
        this.soundIds = soundIds.map((id) => new mongodb.ObjectID(id));
    }

    save() {
        const db = getDb();
        return db.collection(SOUND_SET_COLLECTION_NAME)
            .insertOne(this)
            .then((res) => {
                    console.log(res.ops[0]);
                    return res.ops[0];
                }
            )
            .catch((err) => {
                console.log(err);
            });
    }

    static fetchById(setId) {
        const db = getDb();
        return db.collection(SOUND_SET_COLLECTION_NAME)
            .aggregate([
                {
                    $match: {
                        _id: {
                            $eq: new mongodb.ObjectID(setId)
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'sounds',
                        localField: 'soundIds',
                        foreignField: '_id',
                        as: 'soundArray'
                    }
                },
                {
                    $project: {
                        'soundIds': false
                    }
                }])
            .next()
            .then((res) => {
                console.log(res);
                return res;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = SoundSet;