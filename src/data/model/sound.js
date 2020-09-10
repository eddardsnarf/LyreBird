const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('Sound', soundSchema);
