"use strict"

class PlayService {

    static getInstance() {
        switch (process.env.DBPROVIDER) {
            case 'MongoDB':
                const PlayMongoDBService = require('./PlayMongoDBService');
                return new PlayMongoDBService();
                break;
        }
    }

    createPlay(userId, gameId, score, date) {
        throw new Error('Method createPlay not implemented.');
    }

    getPlay(id) {
        throw new Error('Method getPlay not implemented.');
    }

    async getPlays() {
        throw new Error('Method getPlays not implemented.');
    }

    updatePlay(id, userId, gameId, score, date) {
        throw new Error('Method updatePlay not implemented.');
    }

    deletePlay(id) {
        throw new Error('Method deletePlay not implemented.');
    }

}

module.exports = PlayService;