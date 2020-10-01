import UserModel, { IUserSchema } from '../model/user';
import  { Schema } from 'mongoose';

export default class UserRepository {
    public favouriteSet = async (_id: Schema.Types.ObjectId, setId: string): Promise<IUserSchema | null> => {
        const query = { _id: { $eq: _id } };
        const update = { $addToSet: { setIds: setId } };
        const options = { new: true, projection: { setIds: 1 } };
        return UserModel.findOneAndUpdate(query,
            update,
            options);
    };

    public unfavouriteSet = async (_id: Schema.Types.ObjectId, setId: string): Promise<void> => {
        const query = { _id: { $eq: _id } };
        const update = { $pull: { setIds: setId } };
        await UserModel.updateOne(query, update);
    };

    public getFavourites = async (_id: Schema.Types.ObjectId): Promise<IUserSchema | null> => {
        const query = { _id: { $eq: _id } };
        const project = { setIds: 1 };
        return UserModel.findOne(query, project);
    };
}

