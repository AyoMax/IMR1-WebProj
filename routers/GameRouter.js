const express = require('express');
const router = express.Router();

const GameController = require('../controllers/GameController');
const gameController = new GameController();

// Déclaration des routes
router.get('/:slug',  gameController.getGame); 
router.post('/register',  gameController.postScoreRegister); 

module.exports = router;