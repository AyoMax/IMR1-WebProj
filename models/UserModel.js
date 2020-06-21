"use stricts"

class UserModel {

    constructor(username, password, mail) {
        this.username = username;
        this.password = password;
        this.mail     = mail;
    }

}

module.exports = UserModel;