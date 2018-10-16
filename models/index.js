const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/flashcards');

mongoose.Promise = Promise;

module.exports.Flashcard = require('./flashcard');