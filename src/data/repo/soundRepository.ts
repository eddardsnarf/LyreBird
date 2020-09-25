import Sound, { ISoundSchema } from '../model/sound';

export class SoundRepository {
    public save = async (sounds: Array<ISoundSchema>): Promise<Array<ISoundSchema>> => {
        const savedSoundsResult = await Sound.insertMany(sounds);
        console.log(savedSoundsResult);
        return savedSoundsResult
            .map((doc) => doc.toObject());
    }

    public fetchByName = async (name: string, page: number, limit: number): Promise<Array<ISoundSchema>> => {
        const soundsQuery = Sound.find({
            name: {
                $regex: `.*${name}.*`,
                $options: 'i'
            }
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

    public fetchById = async (id: string): Promise<ISoundSchema> => (await this.fetchByIds([id]))[0];

    public fetchByIds = async (ids: Array<string>): Promise<Array<ISoundSchema>> => {
        const sounds = await Sound.find({
            _id: {
                $in: ids
            }
        });
        const soundsResult = sounds.map((doc) => doc.toObject());
        console.log(soundsResult);
        return soundsResult;
    };
}
