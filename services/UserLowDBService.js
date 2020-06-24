"use strict"

const low = require('lowdb');
const UserService = require('../services/UserService');

class UserLowDBService extends UserService {

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

module.exports = UserLowDBService;