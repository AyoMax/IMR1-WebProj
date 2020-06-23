"use strict"

const Game = require('../models/GameSchema');
const GameService = require('../services/GameService');

class GameMongoDBService extends GameService {

    createGame(name, description, slug) {
        const user = new Game({
            name: name, 
            description: description, 
            slug: slug
        });
        
        user.save()
            .then(() => console.log('Jeux enregistré'))
            .catch(error => console.log('Erreur lors de l\'enregistrement du jeu'));
    }

    getGame(id) {
        let res = null;

        Game.findOne({ _id: id})
                    .then(game => { res = game })
                    .catch(error => console.log( error ));

        return res;
    }

    async getGames() {
        let res = [];

        for await (const game of Game.find()) {
            res.push(game);
        }
        
        return res;
    }

    updateGame(id, name, description, slug) {
        Game.updateOne({ _id: id }, { _id: id, name: name, description: description, slug})
            .then(()     => console.log('Jeu modifié !'))
            .catch(error => console.log( error ));
    }

    deleteGame(id) {
        Game.deleteOne({ _id: id })
            .then(()     => console.log('Jeu supprimé !'))
            .catch(error => console.log( error ));
    }

}

module.exports = GameMongoDBService;