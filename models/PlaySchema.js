"use strict"

const mongoose = require('mongoose');

const playSchema = mongoose.Schema({
    username: { type: String, required: true },
    slug: { type: String, required: true },
    score: { type: Number },
    date: { type : Date }
});

module.exports = mongoose.model('Play', playSchema);