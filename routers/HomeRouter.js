const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/HomeController');
const homeController = new HomeController();

// Déclaration des routes
router.get ('',         homeController.getIndex);
router.get ('/games',   homeController.getGames);
router.get ('/ranking', homeController.getRanking);


module.exports = router;