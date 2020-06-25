"use strict"

class GameService {

    static getInstance() {
        switch (process.env.DBPROVIDER) {
            case 'MongoDB':
                // On recquiert GameMongoDBService à l'intérieur de la fonction,
                // car si on l'avait déclarer en début de fichier il aurait été déclaré 
                // avant la définition de GameService, dont il hérite
                const GameMongoDBService = require('./GameMongoDBService');
                return new GameMongoDBService();
                break;
            case 'LowDB':
                const GameLowDBService = require("./GameLowDBService");
                return new GameLowDBService();
                break;
        }
    }

    constructor() {}

    createGame(name, description, slug) {
        throw new Error('Method createGame not implemented.');
    }

    getGame(id) {
        throw new Error('Method getGame not implemented.');
    }

    async getGames() {
        throw new Error('Method getGames not implemented.');
    }

    updateGame(id, name, description, slug) {
        throw new Error('Method updateGame not implemented.');
    }

    deleteGame(id) {
        throw new Error('Method deleteGame not implemented.');
    }

}

module.exports = GameService;