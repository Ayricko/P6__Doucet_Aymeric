// Importation du framwork express, package mongosse
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();

//constante de connection BDD
const mdbUser = process.env.DB_USER;
const mdbPass = process.env.DB_PASS;
const mdbAdress = process.env.DB_ADRESS;
const mdbData = process.env.DB_DATA;

// Importation des router
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

// Connection a MongoDB
mongoose
  .connect(`mongodb+srv://${mdbUser}:${mdbPass}@${mdbAdress}/${mdbData}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Sécurise les entête HTTP et empeche les attaques XSS, etc
app.use(helmet());

// Eviter les problème lié a CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Route
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;
