"use strict"

const PlayService = require("./PlayService");

class PlayLowDBService extends PlayService {

    async createPlay(username, slug, score) {
        throw new Error('Method createPlay not implemented.');
    }

    async getPlay(id) {
        throw new Error('Method getPlay not implemented.');
    }

    async getPlays() {
        throw new Error('Method getPlays not implemented.');
    }

    async getGameRanking(slug) {
        throw new Error('Method getGameRanking not implemented.');
    }

    async getUserBestScore(slug, username) {
        throw new Error('Method getUserBestScore not implemented.');
    }

    updatePlay(id, userId, gameId, score, date) {
        throw new Error('Method updatePlay not implemented.');
    }

    deletePlay(id) {
        throw new Error('Method deletePlay not implemented.');
    }

}

module.exports = PlayLowDBService;