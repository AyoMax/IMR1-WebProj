"use strict"

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const gameSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, unique: true}
});

gameSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Game', gameSchema);