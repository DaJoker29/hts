var db = require('../config/database');
var app = require('../server');
var request = require('supertest')('http://localhost:' + app.get('port'));

describe('API', function() {
    describe('MongoDB', function() {
        //Connect to Database

        it('should be running', function() {
            db.conn.readyState.should.be.within(1,2);
        });
    });

    describe('Endpoints', function() {
        describe('/api/notes', function() {
            it('respond with JSON', function(done) {
                request
                    .get('/api/notes')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });
        });
        describe('/api/note', function() {
            it('should respond with Note', function(done) {
                request
                    .get('/api/note')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(function(res) {
                        res.should.have.property('body');
                    })
                    .expect(200, done);
            });
            it('should create a Note when posted to it', function(done) {
                request
                    .post('/api/note')
                    .send({ "title": "Dummy Title", "body": "Dummy Data"})
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(function(res) {
                        res.body.should.have.property("body");
                        res.body.should.have.property("title");
                    })
                    .expect(200, done)
            })
        })
    })
})
