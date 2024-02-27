// auth.router.js
import express from 'express';
import passport from 'passport';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Rutas de autenticación
router.get('/login', authController.renderLoginPage);
router.post('/login', authController.handleLogin);
router.get('/register', authController.renderRegisterPage);
router.post('/register', authController.handleRegister);
router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/auth/login' }), authController.handleGitHubCallback);
router.get('/logout', authController.handleLogout);

export default router;
