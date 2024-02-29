// authController.js
import passport from 'passport';
import UserModel from '../models/User.js';

export const renderLogin = (req, res) => {
  res.render('login');
};

export const login = passport.authenticate('local', {
  successRedirect: '/products',
  failureRedirect: '/auth/login',
  failureFlash: true,
});

export const renderRegister = (req, res) => {
  res.render('register');
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.render('register', { error: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    const newUser = new UserModel({ name, email, password });

    await newUser.save();
    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    res.render('register', { error: 'Error al registrar el usuario' });
  }
};

export const githubAuth = passport.authenticate('github');

export const githubAuthCallback = passport.authenticate('github', {
  failureRedirect: '/auth/login',
  successRedirect: '/products',
});

export const logout = (req, res) => {
  req.logout();
  res.redirect('/auth/login');
};
