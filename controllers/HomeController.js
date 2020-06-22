"use strict"

const { post } = require("../routers/AuthRouter");
const https = require('https');

const Game = require('../models/GameSchema');
const GameService = require('../services/GameMongoDBService');

class HomeController {

    getIndex(req, res) {
        res.render('index');
    }

    getGames(req, res) {
        const gameService = new GameService();
        
        gameService.getGames().then(result => {
            console.log(result);

            res.render('home/games', { games: result });
        });        
    }

    getRanking(req, res) {
        res.render('home/ranking');
    }

}

module.exports = HomeController;