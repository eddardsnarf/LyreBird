import mongoose from 'mongoose';
import { MONGO_URL } from '../../utils/constants';

const mongooseConnect = async (): Promise<void> => {
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

export default mongooseConnect;
