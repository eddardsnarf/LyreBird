const SoundSet = require('../../data/model/soundSet');
const mongodb = require('mongodb');

module.exports = class SoundSetRepository {
    save = async (soundSet) => {
        const savedSet = await SoundSet.create(soundSet);
        console.log(savedSet.toObject());
        return savedSet.toObject();
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
        const savedSets = await SoundSet
            .aggregate(aggregateOperation);

        console.log(savedSets);
        return savedSets;
    }
};
