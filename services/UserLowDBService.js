"use strict"

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const UserService = require('../services/UserService');

class UserLowDBService extends UserService {

    constructor() {
        super();

        const adapter = new FileSync('lowdb.json')
        this.db = low(adapter);
    }

    async createUser(username, password) {
        let status = null;

        await this.getUserByUsername(username).then(res => {
            if (res == null) {        
                this.db.get('users')
                    .push({
                        username: username,
                        password: password, 
                    })
                    .write();
                status = 201;
            } else {
                status = 400;
            }
        });
        
        return status;
    }

    async getUserByUsername(username) {
        let res;

        res = this.db.get('users')
            .filter({username: username})
            .value()[0];

        return res;
    }

    async getUsers() {
        let res;

        res = this.db.get('users').value();

        return res;
    }

    updateUser(id) {
        throw new Error('Method updateUser not implemented.');
    }

    deleteUser(id) {
        throw new Error('Method deleteUser not implemented.');
    }

}

module.exports = UserLowDBService;