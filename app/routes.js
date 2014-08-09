// modules
var mongoose = require('mongoose');
var config = require('../config');

// connect to db
mongoose.connect(config.mongoURL);

var noteSchema = {
    title: String,
    body: String,
    createdOn: { type: Date, default: Date.now },
}

var Note = mongoose.model('Note', noteSchema);

exports.home = function(req,res) {
    res.render('index');
}

exports.getNotes = function(req,res) {
    Note.find(function(err,doc) {
		if(err) res.send(err.message);
		res.send(doc);
    });
}

exports.getLastNote = function(req, res) {
    Note.find().sort( { 'createdOn': -1}).limit(1).exec(function(err,doc) {
		if(err) res.send(err.message);
		res.send(doc);
    });
}

exports.getNote = function(req,res) {
    Note.find({_id: req.params.id }, function(err,doc) {
		if(err) res.send(err.message);
		res.send(doc);
    });
}

exports.createNote = function(req,res) {
    Note.findByIdAndUpdate({_id: req.params.id}, req.body, function(err,doc) {
		if(err) res.send(err.message);
		res.send(doc);
    });
}

exports.updateNote = function(req,res) {
    Note.findByIdAndUpdate({_id: req.params.id}, req.body, function(err,doc) {
		if(err) res.send(err.message);
		res.send(doc);
    });
}

exports.deleteNote = function(req,res) {
    Note.remove({_id: req.params.id}, function(err,doc) {
		if(err) res.send(err.message);
		res.send("Note Deleted");
    });
}

exports.deleteNotes = function(req,res) {
    Note.remove({}, function(err,doc) {
		if(err) res.send(err.message);
		res.send("All Notes Deleted");
    });
}
