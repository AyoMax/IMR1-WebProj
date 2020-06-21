const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const authController = new AuthController();

// Déclaration des routes
router.get ('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get ('/login',    authController.getLogin);

module.exports = router;