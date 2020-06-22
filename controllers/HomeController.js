"use strict"

const { post } = require("../routers/AuthRouter");
const https = require('https');

class HomeController {

    getIndex(req, res) {    
        res.render('index');
    }

    getGames(req, res) {
        res.render('home/games');
    }

    getRanking(req, res) {
        res.render('home/ranking');
    }

}

module.exports = HomeController;