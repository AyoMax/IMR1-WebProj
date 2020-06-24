"use stricts"

/**
 * UserModel utilisé dans le cas de l'utilisation de la base de données LowDB
 */
class UserModel {

    constructor(username, password, gitHubToken) {
        this.username    = username;
        this.password    = password;
        this.gitHubToken = gitHubToken;
    }

}

module.exports = UserModel;