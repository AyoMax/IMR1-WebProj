"use strict"

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const GameService = require("./GameService");

class GameLowDBService extends GameService {

    constructor() {
        super();
        const adapter = new FileSync('db.json')
        this.db = low(adapter);
    }

    createGame(name, description, slug) {
        throw new Error('Method createGame not implemented.');
    }

    getGame(id) {
        throw new Error('Method getGame not implemented.');
    }

    async getGames() {
        // let res = null;

        // res = this.db.get('games');
        // console.log(res);

        // return res;

         throw new Error('Method getGames not implemented.');
    }

    updateGame(id, name, description, slug) {
        throw new Error('Method updateGame not implemented.');
    }

    deleteGame(id) {
        throw new Error('Method deleteGame not implemented.');
    }

}

module.exports = GameLowDBService;