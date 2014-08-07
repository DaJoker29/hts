var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var morgan = require('morgan');

mongoose.connect('mongodb://localhost/hts');

var noteSchema = {
    title: String,
    body: String,
    createdOn: { type: Date, default: Date.now },
}

var Note = mongoose.model('Note', noteSchema);

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Return all notes
app.get('/notes', function(req,res) {
    Note.find(function(err, doc) {
        res.send(doc);
    });
});

// Return the latest note
app.get('/note', function(req, res) {
    Note.find().sort( { 'createdOn': -1}).limit(1).exec( 
        function(err, doc) {
            res.send(doc);
        }
    )
});

// Return a specific note
app.get('/note/:id', function(req,res) {
    Note.find({_id: req.params.id }, function(err,doc) {
        res.send(doc);
    });
});


// Create a note
app.post('/note', function (req, res) {
    Note.create(req.body, function(err, doc) {
        res.send(doc);
    });
});

// Update a note
app.put('/note/:id', function(req,res) {
    Note.findByIdAndUpdate({_id: req.params.id}, req.body, function(err,doc) {
        res.send(doc);
    });
});


// Delete a note
app.delete('/note/:id', function(req,res) {
    Note.remove({_id: req.params.id}, function(err,doc) {
        res.send("Note removed");
    });
});

// Delete all the notes
app.delete('/notes', function(req,res) {
    Note.remove({}, function(err,doc) {
        res.send("Notes Cleared");
    });
});


app.listen(3000);
