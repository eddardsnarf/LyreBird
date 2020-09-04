const SOUND_SET_COLLECTION_NAME = 'soundSets';
const mongodb = require('mongodb');
const getDb = require('../db/database').getDb;

class SoundSet {
    constructor(name, iconUrl, soundIds) {
        this.name = name;
        this.iconUrl = iconUrl;
        this.soundIds = soundIds.map((id) => new mongodb.ObjectID(id));
    }

    async save() {
        const db = getDb();
        const savedSet = await db.collection(SOUND_SET_COLLECTION_NAME)
            .insertOne(this);
        console.log(savedSet.ops[0]);
        return savedSet.ops[0];
    }

    static async fetchById(setId) {
        const aggregateOperation = [
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
            }]
        const db = getDb();
        const savedSets = await db.collection(SOUND_SET_COLLECTION_NAME)
            .aggregate(aggregateOperation)
            .next();
        console.log(savedSets);
        return savedSets;
    }
}

module.exports = SoundSet;