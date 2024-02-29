// auth.router.js
import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.get('/login', authController.renderLogin);
authRouter.post('/login', authController.login);
authRouter.get('/register', authController.renderRegister);
authRouter.post('/register', authController.register);
authRouter.get('/github', authController.githubAuth); 
authRouter.get('/github/callback', authController.githubAuthCallback);
authRouter.get('/logout', authController.logout);

export default authRouter;
