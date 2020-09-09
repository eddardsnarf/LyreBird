const mongodb = require('mongodb');

class SoundSet {
    constructor (name, iconUrl, soundIds) {
        this.name = name;
        this.iconUrl = iconUrl;
        this.soundIds = soundIds.map((id) => new mongodb.ObjectID(id));
    }
}

module.exports = SoundSet;
