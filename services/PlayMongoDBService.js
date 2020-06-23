"use strict"

const Play = require('../models/PlaySchema');
const PlayService = require('./PlayService');

class PlayMongoDBService extends PlayService {

    createPlay(userId, gameId, score, date) {
        const play = new Play({
            userId: userId, 
            gameId: gameId, 
            score: score,
            date: date
        });
        
        user.save()
            .then(() => console.log('Partie enregistré'))
            .catch(error => console.log('Erreur lors de l\'enregistrement de la partie'));
    }

    getPlay(id) {
        res = null;

        Play.findOne({ _id: id})
                    .then(play => res = play)
                    .catch(error => console.log( error ));

        return res;
    }

    async getPlays() {
        let res = [];

        for await (const play of Play.find()) {
            res.push(play);
        }
        
        return res;
    }

    updatePlay(id, userId, gameId, score, date) {
        Play.updateOne({ _id: id }, { 
            _id: id, 
            userId: userId, 
            gameId: gameId, 
            score: score,
            date: date
        })
        .then(()     => console.log('Partie modifié !'))
        .catch(error => console.log( error ));
    }

    deletePlay(id) {
        Play.deleteOne({ _id: id })
            .then(()     => console.log('Partie supprimé !'))
            .catch(error => console.log( error ));
    }

}

module.exports = PlayMongoDBService;