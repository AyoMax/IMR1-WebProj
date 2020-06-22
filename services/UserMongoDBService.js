"use strict"

const User = require('../models/UserSchema');

class UserMongoDBService {

    createUser(surname, password, gitHubToken) {
        const user = new User({
            surname: surname, 
            password: password, 
            gitHubToken: gitHubToken
        });

        user.save()
            .then(() => console.log('Utilisateur enregistré'))
            .catch(error => console.log('Erreur lors de l\'enregistrement de l\'utilisateur'));
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