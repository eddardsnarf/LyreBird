import express from 'express';
import { AdminController } from '../controller/admin';
import { fileMulter } from '../middleware/multer';
import isAuth from '../middleware/isAuth';
import attachCurrentUser from '../middleware/attachCurrentUser';
import checkRole from '../middleware/checkRole';
import errorHandler from '../middleware/errorHandler';

const router = express.Router();
const adminController = new AdminController();

router.post('/sounds', isAuth, errorHandler, attachCurrentUser, checkRole('admin'), fileMulter, adminController.postSounds);
router.post('/sets', isAuth, errorHandler, attachCurrentUser, checkRole('admin'), adminController.postSoundSet);

export default router;
