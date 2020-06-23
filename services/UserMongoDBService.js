"use strict"

const User = require('../models/UserSchema');
const UserService = require('../services/UserService');

class UserMongoDBService extends UserService {

    createUser(username, password) {
        const user = new User({
            username: username, 
            password: password
        });

        user.save()
            .then(() => console.log('Utilisateur enregistré'))
            .catch(error => {
                console.log('Erreur lors de l\'enregistrement de l\'utilisateur');
                throw error;
            });
    }

    createUser(username, password, gitHubToken) {
        const user = new User({
            username: username, 
            password: password, 
            gitHubToken: gitHubToken
        });

        user.save()
            .then(() => console.log('Utilisateur enregistré'))
            .catch(error => {
                console.log('Erreur lors de l\'enregistrement de l\'utilisateur');
                throw error;
            });
    }

    async getUserByUsername(username) {
        let res = null;

        await User.findOne({ username: username})
                    .then(user => {
                        res = user;
                    })
                    .catch(error => console.log( error ));

        return res;
    }

    async getUsers() {
        let res = [];

        for await (const user of User.find()) {
            res.push(user);
        }
        
        return res;
    }

    updateUser(id) {
        User.updateOne({ _id: id }, {

        })
        .then(()     => console.log('Utilisateur modifié !'))
        .catch(error => console.log( error ));
    }

    deleteUser(id) {
        User.deleteOne({ _id: id })
            .then(()     => console.log('Objet supprimé !'))
            .catch(error => console.log( error ));
    }

}

module.exports = UserMongoDBService;