// load modules
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var routes = require('./routes/notes');
var db = require('./config/database');

// configuration
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'))
app.set('env', process.env.NODE_ENV || 'development');
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');

// production only options
if('production' == app.get('env')) {
    app.use(
        morgan('combined', {
            skip: function (req, res) { return res.statusCode < 400 }
        }));
}

// development only options
if('development' == app.get('env')) {
    app.use(morgan('dev'));
}

// deploy routes
app.get('/', routes.home);
app.route('/api/notes')
    .get(routes.getNotes)
    .delete(routes.deleteNotes);
app.route('/api/note')
    .get(routes.getLastNote)
    .post(routes.createNote);
app.route('/api/note/:id')
    .get(routes.getNote)
    .put(routes.updateNote)
    .delete(routes.deleteNote);


// connect to database
db.connect;

// setup database listeners
db.conn.on('open', function() {
    console.log('Connection established to mongodb %s on %s', db.conn.name, db.conn.host);
});

db.conn.on('error', function(err) {
    console.error('Mongodb connection error: %s\nExiting', err.message);
    process.exit(1);
});

// start server
app.listen(app.get('port'));
console.log('Running on port ' + app.get('port'));

//expose app
exports = module.exports = app;
