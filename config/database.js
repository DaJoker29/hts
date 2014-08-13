var mongoose = require('mongoose');
var mongoURL = process.env.NODE_ENV == "production" ? "mongodb://localhost/hts" : "mongodb://localhost/hts-dev"

// schema
var noteSchema = {
    title: String,
    body: String,
    date: { type: Date, default: Date.now },
}

//exports
exports.connect = mongoose.connect(mongoURL);
exports.conn = mongoose.connection;
exports.Note = mongoose.model('Note', noteSchema);
