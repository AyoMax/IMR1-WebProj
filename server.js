const express = require('express');
const path = require('path');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Redirection de la home page
app.get('/', (req, res) => {
    res.redirect('/auth/register');
})

// Déclaration des routeurs
const AuthRouter = require('./routers/AuthRouter');

app.use('/auth', AuthRouter);

// Lancement du server sur le port 3000
app.listen(3000, function () {
    console.log('Serveur listening on port 3000');
});