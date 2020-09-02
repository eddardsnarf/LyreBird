const mongodb = require('mongodb');
const { getDb } = require('../../utils/database');

class Sound {
  constructor(id, name, path) {
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.name = name;
    this.path = path;
  }

  save() {
    const db = getDb();
    return db.collection('sounds')
      .insertOne(this)
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
  }
}
module.exports = Sound;
