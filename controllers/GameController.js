"use strict"

const { post } = require("../routers/GameRouter");
const https = require('https');

const Game = require('../models/GameSchema');
const GameService = require('../services/GameMongoDBService');

const Play = require('../models/PlaySchema');
const PlayService = require('../services/PlayMongoDBService');

class GameController {

    async getGame(req, res) {
        const slug = req.params.slug;
        console.log("params :"+slug);

        const playService = PlayService.getInstance();
        let maxPlayerScore = await playService.getUserBestScore(slug, req.cookies.username);
        let maxScore = 0;
        if(maxPlayerScore.length > 0){
            maxScore = maxPlayerScore[0].maxScore;
        }

        console.log(maxPlayerScore);
        console.log(maxScore);
        res.render("games/"+slug, {
            maxScore: maxScore
        }, function(err) {
            if (err) {
                res.redirect('/not-found');
            }else{
                res.render("games/"+slug, {
                    maxScore: maxScore
                });
            }
        });
        
    }

    postScoreRegister(req, res){
        console.log(req.body);
        console.log(req.cookies);
        if (req.body) {
            const playService = PlayService.getInstance();
            playService.createPlay(req.cookies.username, req.body.slug, req.body.score).then(status => {;
                res.sendStatus(status);
            });
        } else {
            res.sendStatus(500);
        }
    }

}

module.exports = GameController;