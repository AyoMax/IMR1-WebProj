"use strict"

const { post } = require("../routers/AuthRouter");
const https = require('https');

const Game = require('../models/GameSchema');
const GameService = require('../services/GameService');
const UserService = require("../services/UserService");

const Play = require('../models/PlaySchema');
const PlayService = require('../services/PlayMongoDBService');

class HomeController {

    getIndex(req, res) {
        const userService = UserService.getInstance();
        userService.getUserByUsername(req.cookies.username).then(result => {
            res.render('index', { user: result });
        });
    }

    getGames(req, res) {
        const gameService = GameService.getInstance();
        
        gameService.getGames().then(result => {
            res.render('home/games', { games: result, bestScore: bestScore, rank: rank });
        });        
    }

    async getRanking(req, res) {
        const playService = PlayService.getInstance();

        console.log('**** click-counter ****');
        let clickCounterRanking = await playService.getGameRanking('click-counter');
        console.log(clickCounterRanking);

        console.log('**** clickermost ****');
        let clickermostRanking = await playService.getGameRanking('clickermost');
        console.log(clickermostRanking);
        res.render('home/ranking', {
            clickCounterRanking: clickCounterRanking,
            clickermostRanking: clickermostRanking
        });
    }

}

module.exports = HomeController;