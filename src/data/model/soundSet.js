const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('SoundSet', soundSetSchema);
