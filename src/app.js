const express = require('express');
const bodyParser = require('body-parser');

const multerMiddleware = require('./api/middleware/multer');
const adminRoutes = require('./api/routes/admin');
const storageRoutes = require('./api/routes/storage');
const mongoConnect = require('./utils/database');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multerMiddleware);
app.use(storageRoutes);
app.use('/admin', adminRoutes);

mongoConnect()
  .then(() => {
    app.listen(3000);
  });
