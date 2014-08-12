var config = require('../config');
var mongoose = require('mongoose');
var request = require('supertest')('http://localhost:' + config.port);
var app = require('express')();

describe('API', function() {
    describe('MongoDB', function() {
        //Connect to Database

        before(function(done) {
            mongoose.connect(config.mongoURL, function(err) {
                done()
            });
        });

        it('should be running', function() {
            mongoose.connection.readyState.should.eql(1)
        });
    });

    describe('Endpoints', function() {
        describe('/notes', function() {
            it('respond with JSON', function(done) {
                request
                    .get('/notes')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });
        });
        describe('/note', function() {
            it('should respond with Note', function(done) {
                request
                    .get('/note')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(function(res) {
                        res.should.have.property('body');
                    })
                    .expect(200, done);
            });
            it('should create a Note when posted to it', function(done) {
                request
                    .post('/note')
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
