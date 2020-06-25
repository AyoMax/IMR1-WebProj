"use strict"

class UserService {

    static getInstance() {
        switch (process.env.DBPROVIDER) {
            case 'MongoDB':
                const UserMongoDBService = require("./UserMongoDBService");
                return new UserMongoDBService();
                break;
            case 'LowDB':
                const UserLowDBService = require("./UserLowDBService");
                return new UserLowDBService();
                break;
        }
    }

    async createUser(username, password) {
        throw new Error('Method createUser not implemented.');
    }

    async getUserByUsername(name) {
        throw new Error('Method getUserByName not implemented.');
    }

    async getUsers() {
        throw new Error('Method getUsers not implemented.');
    }

    updateUser(id) {
        throw new Error('Method updateUser not implemented.');
    }

    deleteUser(id) {
        throw new Error('Method deleteUser not implemented.');
    }

}

module.exports = UserService;