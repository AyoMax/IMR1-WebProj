const express      = require('express');
const path         = require('path');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');

// Récupération des variables d'environnement dans le fichier .env
dotenv.config();

switch (process.env.DBPROVIDER) {
    case 'MongoDB':
        // Connexion à la BDD mongodb
        const mongoose = require('mongoose');
        const mongodbUri = "mongodb+srv://ayomax:5mMwlLPIyZf3k68i@imr1webproj-ac8e2.mongodb.net/imr1webproj";
        mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Connexion à MongoDB réussie !'))
            .catch(() => console.log('Connexion à MongoDB échouée !'));
        break;
    case 'LowDB':
        // Connexion à la BDD lowdb
        const low = require('lowdb');
        const FileSync = require('lowdb/adapters/FileSync')
        
        const adapter = new FileSync('lowdb.json')
        const db = low(adapter)
        break;
}

// Défiinition de l'app
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false })); // permet de récupérer le body d'une requête post
app.use(bodyParser.json());

// Déclaration des routeurs
const AuthRouter = require('./routers/AuthRouter');
const HomeRouter = require('./routers/HomeRouter');
const GameRouter = require('./routers/GameRouter');

app.use('/auth', AuthRouter);

// Guard - "Vous ne passerez pas !" ... si vous n'êtes pas connectés
app.get('*', (req, res, next) => {
    const cookies = req.cookies;
    const originalURL = req.originalUrl;

    if (cookies.username) {
        if (cookies.isconnect == 'true') {
            next();
        } else {
            res.redirect('/auth/login');
        }
    } else {
        res.redirect('/auth/register');
    }
});

app.use('/',     HomeRouter);
app.use('/game', GameRouter);
app.get ('*', (req, res) => {
    res.render('404');
});

// Lancement du server sur le port 3000
app.listen(3000, function () {
    console.log('Serveur listening on port 3000');
});