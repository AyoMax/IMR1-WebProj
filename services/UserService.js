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

    createUser(username, password) {
        throw new Error('Method createUser not implemented.');
    }

    createUser(surname, password, gitHubToken) {
        throw new Error('Method createUser not implemented.');
    }

    getUserByUsername(name) {
        throw new Error('Method getUserByName not implemented.');
    }

    getUsers() {
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