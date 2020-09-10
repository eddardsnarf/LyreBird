const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./api/routes/admin');
const storageRoutes = require('./api/routes/storage');
const mongooseConnect = require('./data/db/database');

const app = express();

app.use(bodyParser.json());
app.use(storageRoutes);
app.use('/admin', adminRoutes);

mongooseConnect().then(() => {
    app.listen(3000);
});
