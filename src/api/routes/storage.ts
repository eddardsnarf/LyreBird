import express from 'express';
import { StorageController } from '../controller/storage';
import isAuth from '../middleware/isAuth';
import attachCurrentUser from '../middleware/attachCurrentUser';
import errorHandler from '../middleware/errorHandler';

const router = express.Router();
const storageController = new StorageController();

router.get('/sounds/:soundId', isAuth,errorHandler, attachCurrentUser, storageController.getSoundFile);
router.get('/sounds', isAuth,errorHandler, attachCurrentUser, storageController.searchByName);
router.get('/sets/:setId', isAuth, errorHandler,attachCurrentUser, storageController.getSoundSet);

export default router;
