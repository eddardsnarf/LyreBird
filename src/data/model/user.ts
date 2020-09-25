import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IUserSchema extends mongoose.Document {
    email: string;
    password: string;
    name: string;
    role?: string;
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    }
},
{ versionKey: false }
);

userSchema.index({ name: 1 });

const model = mongoose.model<IUserSchema>('User', userSchema);

export default model;
