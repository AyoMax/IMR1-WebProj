const express = require('express');
const path = require('path');

// Connexion à la BDD mongodb
const mongoose = require('mongoose');
const mongodbUri = "mongodb+srv://ayomax:5mMwlLPIyZf3k68i@imr1webproj-ac8e2.mongodb.net/imr1webproj";
mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Redirection de la home page
// app.get('/', (req, res) => {
    
// });

app.use(express.static(path.join(__dirname, 'public')));

// Déclaration des routeurs
const AuthRouter = require('./routers/AuthRouter');
const HomeRouter = require('./routers/HomeRouter');

app.use('/auth', AuthRouter);
app.use('/',     HomeRouter);

// Lancement du server sur le port 3000
app.listen(3000, function () {
    console.log('Serveur listening on port 3000');
});