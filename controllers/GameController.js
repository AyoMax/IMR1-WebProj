"use strict"

const { post } = require("../routers/GameRouter");
const https = require('https');

const Game = require('../models/GameSchema');
const GameService = require('../services/GameMongoDBService');

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

}

module.exports = GameController;