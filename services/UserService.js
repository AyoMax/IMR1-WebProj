"use strict"

class UserService {

    static getInstance() {
        switch (process.env.DBPROVIDER) {
            case 'MongoDB':
                const UserMongoDBService = require("./UserMongoDBService");
                return new UserMongoDBService();
                break;
        }
    }

    createUser(surname, password, gitHubToken) {
        throw new Error('Method createPlay not implemented.');
    }

    getUser(id) {
        throw new Error('Method createPlay not implemented.');
    }

    getUsers() {
        throw new Error('Method createPlay not implemented.');
    }

    updateUser(id) {
        throw new Error('Method createPlay not implemented.');
    }

    deleteUser(id) {
        throw new Error('Method createPlay not implemented.');
    }

}

module.exports = UserService;