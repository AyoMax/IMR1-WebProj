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
        throw new Error('Method getGameRanking not implemented.');

        // let res = [];

        // const userService = new UserLowDBService();
        // await userService.getUsers().then(users => {
        //     for (let user of users) {
        //         this.getUserBestScore(slug, user.username).then(score => {
        //             console.log(score);
        //             if (score > -1) {
        //                 res.push({_id: user.username, maxScore: score})
        //             }
        //         })
        //     }
        // })

        // res.sort((a, b) => a.score > b.score);

        // if (res.length > 10) {
        //     return res.splice(0, 10);
        // } else {
        //     return res;
        // }
    }

    async getUserBestScore(slug, username) {
        throw new Error('Method getUserBestScore not implemented.');

        // let res = null;

        // res = this.db.get('plays').value();
        
        // res.filter(play => (play.slug == slug && play.username == username));

        // if (res.length > 0) {
        //     res.reduce(function(a,b) {
        //         return Math.max(a.score, b.score);
        //     });

        //     return res[0].score;
        // } else {
        //     return -1;
        // }
    }

    updatePlay(id, userId, gameId, score, date) {
        throw new Error('Method updatePlay not implemented.');
    }

    deletePlay(id) {
        throw new Error('Method deletePlay not implemented.');
    }

}

module.exports = PlayLowDBService;