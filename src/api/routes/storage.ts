import express from 'express';
import { StorageController } from '../controller/storage';
import isAuth from '../middleware/isAuth';
import attachCurrentUser from '../middleware/attachCurrentUser';

const router = express.Router();
const storageController = new StorageController();

router.get('/sounds/:soundId', isAuth, attachCurrentUser, storageController.getSoundFile);
router.get('/sounds', isAuth, attachCurrentUser, storageController.searchByName);
router.get('/sets/:setId', isAuth, attachCurrentUser, storageController.getSoundSet);

export default router;
