// load modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var morgan = require('morgan');
var config = require('./config');

// connect to db
mongoose.connect(config.mongoURL);

var noteSchema = {
    title: String,
    body: String,
    createdOn: { type: Date, default: Date.now },
}

var Note = mongoose.model('Note', noteSchema);

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'));
app.set('view engine', 'jade');

// routes
require('./app/routes')(app);

// start server
app.listen(config.port);
console.log('Running on port ' + config.port);

//expose app
exports = module.exports = app;
