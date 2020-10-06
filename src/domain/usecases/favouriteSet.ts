import UserRepository from '../../data/repo/userRepository';
import { Schema } from 'mongoose';
import { IUserSchema } from '../../data/model/user';

export const favouriteSet = async (userId: Schema.Types.ObjectId, setId: string, userRepo: UserRepository): Promise<IUserSchema | null> => {
    return userRepo.favouriteSet(userId, setId);
};
export const unfavouriteSet = async (userId: Schema.Types.ObjectId, setId: string, userRepo: UserRepository):Promise<void> => {
    return userRepo.unfavouriteSet(userId,setId);
};

