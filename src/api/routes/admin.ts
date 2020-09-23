import express from 'express';
import { AdminController } from '../controller/admin';
import { fileMulter } from '../middleware/multer';

const router = express.Router();
const adminController = new AdminController();

router.post('/sounds', fileMulter, adminController.postSounds);
router.post('/sets', adminController.postSoundSet);

export default router;
