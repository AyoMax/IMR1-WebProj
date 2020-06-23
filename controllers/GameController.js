"use strict"

const { post } = require("../routers/GameRouter");
const https = require('https');

const Game = require('../models/GameSchema');
const GameService = require('../services/GameMongoDBService');

const Play = require('../models/PlaySchema');
const PlayService = require('../services/PlayMongoDBService');

class GameController {

    getGame(req, res) {
        const slug = req.params.slug;
        console.log("params :"+slug);

        res.render("games/"+slug, {}, function(err) {
            if (err) {
                res.redirect('/not-found');
            }else{
                res.render("games/"+slug);
            }
        });
        
    }

    postScoreRegister(req, res){
        console.log(req.body);
        if (req.body) {
            const playService = PlayService.getInstance();
            try {
                playService.createPlay(req.body.username, req.body.slug, req.body.score, req.body.date);
                res.sendStatus(201);
            } catch (error) {
                res.sendStatus(500);
            }  
        } else {
            res.sendStatus(500);
        }
    }

}

module.exports = GameController;