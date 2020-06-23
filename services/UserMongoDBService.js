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

    getUser(id) {
        res = null;

        User.findOne({ _id: id})
            .then(user => res = user)
            .catch(error => console.log( error ));

        return res;
    }

    getUsers() {
        res = null;

        User.find({})
            .then(users => res = users)
            .catch(error => console.log( error ));

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