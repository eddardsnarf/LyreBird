const express = require('express');
const storageController = require('../controller/storage');

const router = express.Router();

router.get('/sounds', storageController.getSoundFile);

module.exports = router;
