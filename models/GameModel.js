"use stricts"

/**
 * GameModel utilisé dans le cas de l'utilisation de la base de données LowDB
 */
class GameModel {

    constructor(name, description, slug) {
        this.name        = name;
        this.description = description;
        this.slug        = slug;
    }

}

module.exports = GameModel;