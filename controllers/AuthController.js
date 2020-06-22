"use strict"

const { post } = require("../routers/AuthRouter");
const https = require('https');

class AuthController {

    getRegister(req, res) {    
        if (req.query !== {} && req.query.method == 'github') {
            const data = JSON.stringify({
                client_id: '62af1ec2d4779ce3500a',
                client_secret: '059ea5c79920d26067fbd54ed452cc09fe73ce71',
                code: req.query.code
            });

            const options = {
                hostname: 'github.com',
                path: '/login/oauth/access_token',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                }
            };

            const request = https.request(options, (res) => {
                console.log(`statusCode: ${res.statusCode}`)

                res.on('data', (d) => {
                    resultat = JSON.parse(d);
                });
            });

            request.on('error', (error) => {
                console.log('erreur :');
                console.error(error);
            });

            request.write(data);
            request.end();
        }

        res.render('auth/register');
    }

    postRegister(req, res) {
        // TODO
    }

    getLogin(req, res) {
        res.render('auth/login');
    }

    postLogin(req, res) {
        // TODO
    }

}

module.exports = AuthController;