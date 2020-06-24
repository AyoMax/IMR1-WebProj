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
            let gameRanking = await playService.getGameRanking(game.slug);
            console.log(gameRanking);
            let rank = false;
            // tri du tableau pour gérer les égalités
            for(var i = 1; i < gameRanking.length ; i++){
                console.log(i);
                if(gameRanking[i - 1].maxScore != gameRanking[i].maxScore){
                    if((gameRanking[i - 1]._id == req.cookies.username || gameRanking[i]._id == req.cookies.username) && !rank){
                        rank = i;
                    }
                }
            }
            console.log("rang :"+rank)


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

        console.log('**** click-counter rety ****');
        let clickCounterRanking = await playService.getGameRanking('click-counter');
        console.log(clickCounterRanking);
        console.log(clickCounterRanking.length);

        let rank = 1;
        let clickCounterRankTab = [];
        for(var i = 1; i < clickCounterRanking.length ; i++){
            console.log(i);
            if(clickCounterRanking[i - 1].maxScore != clickCounterRanking[i].maxScore){
                rank = i;
            }
            clickCounterRankTab.push({
                _id: clickCounterRanking[i]._id,
                maxScore: clickCounterRanking[i].maxScore,
                rank: rank
            });
        }
        console.log(clickCounterRankTab);



        console.log('**** clickermost ****');
        let clickermostRanking = await playService.getGameRanking('clickermost');
        console.log(clickermostRanking);

        rank = 1;
        let clickermostRankTab = [];
        for(var j = 1; j < clickermostRanking.length ; j++){
            console.log(j);
            if(clickermostRanking[j - 1].maxScore != clickermostRanking[j].maxScore){
                rank = j;
            }
            clickermostRankTab.push({
                _id: clickermostRanking[j]._id,
                maxScore: clickermostRanking[j].maxScore,
                rank: rank
            });

        }
        console.log(clickermostRankTab);
        
        res.render('home/ranking', {
            clickCounterRanking: clickCounterRankTab,
            clickermostRanking: clickermostRankTab
        });
    }



}

module.exports = HomeController;