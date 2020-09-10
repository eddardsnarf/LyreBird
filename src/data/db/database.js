const mongoose = require('mongoose');
const MONGO_URL = 'mongodb+srv://raijin:raijin@cluster0.cvfdt.mongodb.net/fujin?retryWrites=true&w=majority';

const mongooseConnect = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = mongooseConnect;
