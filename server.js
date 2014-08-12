// load modules
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var config = require('./config');

// load routes
var routes = require('./app/routes');

// configuration
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'));
app.set('view engine', 'jade');

// deploy routes
app.get('/', routes.home);
app.route('/notes')
    .get(routes.getNotes)
    .delete(routes.deleteNotes);
app.route('/note')
    .get(routes.getLastNote)
    .post(routes.createNote);
app.route('/note/:id')
    .get(routes.getNote)
    .put(routes.updateNote)
    .delete(routes.deleteNote);


// start server
app.listen(config.port);
console.log('Running on port ' + config.port);

//expose app
exports = module.exports = app;
