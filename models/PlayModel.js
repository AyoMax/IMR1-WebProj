"use stricts"

/**
 * PlayModel utilisé dans le cas de l'utilisation de la base de données LowDB
 */
class PlayModel {

    constructor(username, slug, score) {
        this.username = username;
        this.slug     = slug;
        this.score    = score;
        this.date     = date;
    }

}

module.exports = PlayModel;