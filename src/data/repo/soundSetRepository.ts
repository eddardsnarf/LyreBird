import mongodb from 'mongodb';
import SoundSet, { ISoundSetSchema } from '../model/soundSet';

export class SoundSetRepository {
    public save = async (soundSet: ISoundSetSchema): Promise<ISoundSetSchema> => {
        const savedSet = await SoundSet.create(soundSet);
        console.log(savedSet.toObject());
        return savedSet.toObject();
    };

    public fetchById = async (setId: string): Promise<Array<ISoundSetSchema>> => {
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
    };
}
