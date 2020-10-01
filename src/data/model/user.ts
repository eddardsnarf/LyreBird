import mongoose, { Schema } from 'mongoose';


export interface IUserSchema extends mongoose.Document {
    email: string;
    password: string;
    name: string;
    role?: string;
    setIds?: [string]
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
    },
    setIds: {
        type: [Schema.Types.ObjectId],
        required: false,
        ref: 'User'
    }
},
{ versionKey: false }
);

userSchema.index({ name: 1 });

const model = mongoose.model<IUserSchema>('User', userSchema);

export default model;
