const mongodb = require('mongodb');

const { MongoClient } = mongodb;

let db;

const mongoConnect = async () => {
    try {
        const client = await MongoClient.connect('mongodb+srv://raijin:raijin@cluster0.cvfdt.mongodb.net/fujin?retryWrites=true&w=majority');
        db = client.db();
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getDb = () => {
    if (db) {
        return db;
    }
    throw Error('No Database found!');
};

module.exports = mongoConnect;
module.exports.getDb = getDb;
