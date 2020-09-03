const express = require('express');
const adminController = require('../controller/admin');
const multer = require('../middleware/multer');

const router = express.Router();

router.post('/sounds', multer, adminController.postSounds);
router.post('/sets',adminController.postSoundSet);

module.exports = router;
