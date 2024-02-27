import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import flash from 'express-flash';
import expressHandlebars from 'express-handlebars';
import dotenv from 'dotenv';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import authRouter from './routes/auth.router.js';
import viewsRouter from './routes/views.router.js';
import ViewsController from './controllers/views.controller.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuración de Express Handlebars
const viewsController = new ViewsController();
app.engine('.handlebars', expressHandlebars({ extname: '.handlebars' }));
app.set('view engine', '.handlebars');
app.set('views', 'views');

// Configuración de sesiones y autenticación
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Definir tus estrategias de passport aquí...

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/auth', authRouter);
app.use('/views', viewsRouter);

// Configurar rutas para manejar páginas no encontradas o errores
app.use((req, res, next) => {
  res.status(404).send('Página no encontrada');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
