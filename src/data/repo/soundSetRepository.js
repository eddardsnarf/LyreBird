const SOUND_SET_COLLECTION_NAME = 'soundSets';
const mongodb = require('mongodb');

module.exports = class SoundSetRepository {
    constructor (db) {
        this.db = db;
    }

    save = async (soundSet) => {
        const savedSet = await this.db().collection(SOUND_SET_COLLECTION_NAME)
            .insertOne(soundSet);

        console.log(savedSet.ops[0]);
        return savedSet.ops[0];
    }

    fetchById = async (setId) => {
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
                    soundIds: false
                }
            }];
        const savedSets = await this.db().collection(SOUND_SET_COLLECTION_NAME)
            .aggregate(aggregateOperation)
            .next();

        console.log(savedSets);
        return savedSets;
    }
};
