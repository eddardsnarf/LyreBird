import mongoose, { Schema } from 'mongoose';

export interface ISoundSetSchema extends mongoose.Document {
    name: string
    iconUrl: string
    soundIds: [string]
}

const soundSetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    iconUrl: {
        type: String,
        required: true
    },
    soundIds: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: 'Sound'
    }
});

const model = mongoose.model<ISoundSetSchema>('SoundSet', soundSetSchema);

export default model;
