import { Schema } from 'mongoose';
import UserRepository from '../../data/repo/userRepository';
import { IUserSchema } from '../../data/model/user';

export const getFavourites = async (userId: Schema.Types.ObjectId, userRepo: UserRepository): Promise<IUserSchema | null> => {
    return userRepo.getFavourites(userId);
};
