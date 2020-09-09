const express = require('express');
const AdminController = require('../controller/admin');
const multer = require('../middleware/multer');
const router = express.Router();

const adminController = new AdminController();

router.post('/sounds', multer, adminController.postSounds);
router.post('/sets',adminController.postSoundSet);

module.exports = router;
