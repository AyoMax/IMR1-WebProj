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

            // tri du tableau pour gérer les égalités
            let rank = 1;
            let tabRankUsername = [];
            if (gameRanking[0]) {
                tabRankUsername.push({
                    _id: gameRanking[0]._id,
                    maxScore: gameRanking[0].maxScore,
                    rank: 1
                });
                for(var i = 1; i < gameRanking.length ; i++){
                    if(gameRanking[i - 1].maxScore != gameRanking[i].maxScore){
                        rank = i+1;
                    }
                    tabRankUsername.push({
                        _id: gameRanking[i]._id,
                        rank: rank
                    });
                }
            }

            // récupération du rang pour le joueur connecté
            let finalRank = false;
            for(var player of tabRankUsername){
                if(player._id == req.cookies.username){
                    finalRank = player.rank
                }
            }
            tabGameInfo.push({
                name: game.name,
                description: game.description,
                slug: game.slug,
                maxScore: bestScore,
                rank:finalRank
            });
        }
        res.render('home/games', { games: tabGameInfo });
    }

    async getRanking(req, res) {
        const playService = PlayService.getInstance();

        let clickCounterRanking = await playService.getGameRanking('click-counter');

        let rank = 1;
        let clickCounterRankTab = [];
        clickCounterRankTab.push({
            _id: clickCounterRanking[0]._id,
            maxScore: clickCounterRanking[0].maxScore,
            rank: 1
        });
        for(var i = 1; i < clickCounterRanking.length ; i++){
            if(clickCounterRanking[i - 1].maxScore != clickCounterRanking[i].maxScore){
                rank = i+1;
            }
            clickCounterRankTab.push({
                _id: clickCounterRanking[i]._id,
                maxScore: clickCounterRanking[i].maxScore,
                rank: rank
            });
        }

        let clickermostRanking = await playService.getGameRanking('clickermost');

        rank = 1;
        let clickermostRankTab = [];
        clickermostRankTab.push({
            _id: clickermostRanking[0]._id,
            maxScore: clickermostRanking[0].maxScore,
            rank: 1
        });
        for(var j = 1; j < clickermostRanking.length ; j++){
            if(clickermostRanking[j - 1].maxScore != clickermostRanking[j].maxScore){
                rank = j+1;
            }
            clickermostRankTab.push({
                _id: clickermostRanking[j]._id,
                maxScore: clickermostRanking[j].maxScore,
                rank: rank
            });

        }
        
        res.render('home/ranking', {
            clickCounterRanking: clickCounterRankTab,
            clickermostRanking: clickermostRankTab
        });
    }



}

module.exports = HomeController;