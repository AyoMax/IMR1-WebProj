const express = require('express');
const router = express.Router();

const GameController = require('../controllers/GameController');
const gameController = new GameController();

// Déclaration des routes
router.get('/:slug',  gameController.getGame); 

module.exports = router;