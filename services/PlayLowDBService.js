"use strict"

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const PlayService = require("./PlayService");
const UserLowDBService = require('./UserLowDBService');

class PlayLowDBService extends PlayService {

    constructor() {
        super();

        const adapter = new FileSync('lowdb.json')
        this.db = low(adapter);
    }

    async createPlay(username, slug, score) {
        this.db.get('plays')
        .push({
            username: username,
            slug: slug,
            score: score,
            date: new Date()
        })
        .write();

        let status = 201;

        return status;
    }

    async getPlay(id) {
        throw new Error('Method getPlay not implemented.');
    }

    async getPlays() {
        throw new Error('Method getPlays not implemented.');
    }

    async getGameRanking(slug) {
        let res = [];

        const userService = new UserLowDBService();
        await userService.getUsers().then(users => {
            for (let user of users) {
                this.getUserBestScore(slug, user.username).then(score => {
                    if (score.length == 1) {
                        res.push(score[0]);
                    }
                })
            }
        })

        res.sort((a, b) => a.maxScore < b.maxScore);

        if (res.length > 10) {
            return res.splice(0, 10);
        } else {
            return res;
        }
    }

    async getUserBestScore(slug, username) {
        let res = null;

        res = this.db.get('plays').value();
        
        res = res.filter(play => {
            return play.slug == slug && play.username == username
        });

        if (res.length > 0) {
            res.reduce(function(a,b) {
                return a.score > b.score;
            });

            res = [{
                _id: res[0].username, 
                maxScore: res[0].score
            }];
        }
        
        return res;
    }

    updatePlay(id, userId, gameId, score, date) {
        throw new Error('Method updatePlay not implemented.');
    }

    deletePlay(id) {
        throw new Error('Method deletePlay not implemented.');
    }

}

module.exports = PlayLowDBService;