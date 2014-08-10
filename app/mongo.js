// modules
var mongoose = require('mongoose');
var config = require('../config');

// connect to db
mongoose.connect(config.mongoURL);

// schema
var noteSchema = {
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
}

// model (export)
exports.Note = mongoose.model('Note', noteSchema);
