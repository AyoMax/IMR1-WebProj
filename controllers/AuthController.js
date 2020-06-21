"use strict"

class AuthController {

    getRegister(req, res) {
        res.render('auth/register');
    }

    postRegister(req, res) {
        // TODO
    }

    getLogin(req, res) {
        res.render('auth/login');
    }

}

module.exports = AuthController;