"use strict"

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const GameService = require("./GameService");

class GameLowDBService extends GameService {

    constructor() {
        super();

        const adapter = new FileSync('lowdb.json')
        this.db = low(adapter);
    }

    createGame(name, description, slug) {
        this.db.get('games')
            .push({
                name: name,
                description: description, 
                slug: slug
            })
            .write();
    }

    getGame(id) {
        throw new Error('Method getGame not implemented.');
    }

    async getGames() {
        let res = null;
        res = this.db.get('games').value();
        return res;
    }

    updateGame(id, name, description, slug) {
        throw new Error('Method updateGame not implemented.');
    }

    deleteGame(id) {
        throw new Error('Method deleteGame not implemented.');
    }

}

module.exports = GameLowDBService;