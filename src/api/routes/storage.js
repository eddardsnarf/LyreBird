const express = require('express');
const storageController = require('../controller/storage');

const router = express.Router();

router.get('/sounds/:soundId', storageController.getSoundFile);
router.get('/sounds',storageController.searchByName)
router.get('/sets/:setId',storageController.getSoundSet);

module.exports = router;
