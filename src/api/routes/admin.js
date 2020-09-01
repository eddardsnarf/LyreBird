const express = require('express');
const adminController = require('../controller/admin');

const router = express.Router();

router.post('/sounds', adminController.postSoundFile);

module.exports = router;
