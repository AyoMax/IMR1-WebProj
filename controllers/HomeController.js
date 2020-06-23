"use strict"

const { post } = require("../routers/AuthRouter");
const https = require('https');

const Game = require('../models/GameSchema');
const GameService = require('../services/GameService');
const UserService = require("../services/UserService");

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
            res.render('home/games', { games: result });
        });        
    }

    getRanking(req, res) {
        res.render('home/ranking');
    }

}

module.exports = HomeController;