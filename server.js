// load modules
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var config = require('./config');

// routes
var routes = require('./app/routes');

// configuration
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'));
app.set('view engine', 'jade');

// endpoints
app.get('/', routes.home);
app.get('/notes', routes.getNotes);
app.get('/note', routes.getLastNote);
app.get('/note/:id', routes.getNote);
app.post('/note', routes.createNote);
app.put('/note/:id', routes.updateNote);
app.delete('/note/:id', routes.deleteNote);
app.delete('/notes', routes.deleteNotes);


// start server
app.listen(config.port);
console.log('Running on port ' + config.port);

//expose app
exports = module.exports = app;
