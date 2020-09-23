import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './api/routes/admin';
import storageRoutes from './api/routes/storage';
import mongooseConnect from './data/db/database';

const app = express();

app.use(bodyParser.json());
app.use(storageRoutes);
app.use('/admin', adminRoutes);

mongooseConnect().then(() => {
    app.listen(3000);
});
