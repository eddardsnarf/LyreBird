import express from 'express';
import { StorageController } from '../controller/storage';

const router = express.Router();
const storageController = new StorageController();

router.get('/sounds/:soundId', storageController.getSoundFile);
router.get('/sounds', storageController.searchByName);
router.get('/sets/:setId', storageController.getSoundSet);

export default router;
