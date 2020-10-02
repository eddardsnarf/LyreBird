import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './api/routes/admin';
import storageRoutes from './api/routes/storage';
import userRoutes from './api/routes/user';
import mongooseConnect from './data/db/database';

const app = express();

app.use(bodyParser.json());
app.use(storageRoutes);
app.use('/admin', adminRoutes);
app.use('/users',userRoutes);

mongooseConnect().then(() => {
    app.listen(8081);
});
