describe('API', function() {
    describe('MongoDB', function() {
        //Connect to Database
        var mongoose = require('mongoose');
        var config = require('../config');

        before(function(done) {
            mongoose.connect(config.mongoURL, function(err) {
                done()
            });
        })

        it('should be connected', function() {
            mongoose.connection.readyState.should.eql(1)
        })
    })
})
