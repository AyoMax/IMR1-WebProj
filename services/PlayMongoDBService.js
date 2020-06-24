"use strict"

const Play = require('../models/PlaySchema');
const PlayService = require('./PlayService');

class PlayMongoDBService extends PlayService {
    
    async createPlay(username, slug, score) {
        const play = new Play({
            username: username, 
            slug: slug, 
            score: score,
            date: new Date()
        });
        
        let status;

        await play.save()
            .then(() => {
                status = 201
                console.log('Partie enregistré')
            })
            .catch(error => {
                status = 500
                console.log('Erreur lors de l\'enregistrement de la partie')
            });
    
        return status
    }

    async getPlay(id) {
        let res = null;

        await Play.findOne({ _id: id})
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

    async getGameRanking(slug) {
        let res = null;

        res = await Play.aggregate(
            [
                { $match: 
                    { slug: slug } 
                },
                { $group: 
                    { 
                        _id: "$username",
                        maxScore: { $max: "$score" }
                    }
                },
                { $sort: 
                    { "maxScore": -1 }
                },
                {
                    $limit: 10
                }
            ])

        return res;
    }

    async getUserBestScore(slug, username) {
        let res = null;

        res = await Play.aggregate(
            [
                { $match: 
                    { slug: slug }
                },
                { $match: 
                    { username: username }
                },
                { $group: 
                    { 
                        _id: "$username",
                        maxScore: { $max: "$score" }
                    }
                }
            ])
        console.log(res);
        return res;
    }

    updatePlay(id, username, slug, score, date) {
        Play.updateOne({ _id: id }, { 
            _id: id, 
            username: username, 
            slug: slug, 
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