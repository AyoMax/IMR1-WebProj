"use strict"

const mongoose = require('mongoose');

const playSchema = mongoose.Schema({
    userId: { type: String, required: true },
    gameId: { type: String, required: true },
    score: { type: Number },
    date: { date : Date }
});

module.exports = mongoose.model('Play', playSchema);