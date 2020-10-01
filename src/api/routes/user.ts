import express from 'express';

import UserController from '../controller/user';
import isAuth from '../middleware/isAuth';
import attachCurrentUser from '../middleware/attachCurrentUser';
import errorHandler from '../middleware/errorHandler';

const router = express.Router();
const userController = new UserController();

router.post('/', userController.registerUser);
router.get('/me', isAuth, errorHandler, attachCurrentUser, userController.getUser);
router.get('/me/sets', isAuth, errorHandler,attachCurrentUser,userController.getFavourites);
router.post('/me/sets', isAuth, errorHandler,attachCurrentUser,userController.favouriteSoundSet);
router.delete('/me/sets/:setId', isAuth, errorHandler,attachCurrentUser,userController.unfavouriteSoundSet);
router.post('/sessions', userController.loginUser);
export default router;

