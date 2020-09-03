const getDb = require('../db/database').getDb;

class SoundSet {
    constructor(name, iconUrl, soundIds) {
        this.name = name;
        this.iconUrl = iconUrl;
        this.soundIds = soundIds;
    }

    save() {
        const db = getDb();
        return db.collection('soundSets')
            .insertOne(this)
            .then((res) => {
                    console.log(res);
                    return res;
                }
            )
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = SoundSet;