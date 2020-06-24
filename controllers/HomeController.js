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

    async getGames(req, res) {
        
        const gameService = GameService.getInstance();
        const playService = PlayService.getInstance();
        let result = await gameService.getGames();
        
        let tabGameInfo = [];
        for (let game of result) {
            let maxPlayerScore = await playService.getUserBestScore(game.slug, req.cookies.username);
            let bestScore = 0;
            if(maxPlayerScore.length > 0){
                bestScore = maxPlayerScore[0].maxScore;
            }
            let rank = null;
            let gameRanking = await playService.getGameRanking(game.slug);
            let index = 0;
            console.log(gameRanking);
            for (let play of gameRanking){
                index++;
                if(req.cookies.username == play._id){
                    rank = index;
                }
            }
            tabGameInfo.push({
                name: game.name,
                description: game.description,
                slug: game.slug,
                maxScore: bestScore,
                rank:rank
            });
        }
        console.log(tabGameInfo);
        res.render('home/games', { games: tabGameInfo });
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