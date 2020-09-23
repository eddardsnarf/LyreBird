import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface ISoundSchema extends mongoose.Document {
    name: string;
    path: string;
}

const soundSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
},
{ versionKey: false });

soundSchema.index({ name: 1 });

const model = mongoose.model<ISoundSchema>('Sound', soundSchema);

export default model;
