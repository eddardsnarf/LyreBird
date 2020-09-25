import express from 'express';

import UserController from '../controller/user';

const router = express.Router();
const userController = new UserController();

router.post('/login',userController.loginUser);
router.post('/register',userController.registerUser);

export default router;

