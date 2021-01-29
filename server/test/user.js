var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
const url = 'http://localhost:3000';

describe('Testing API', function(){
    it('should return an array', function(done){
        chai.request(url)
            .get('/users')
            .end(function (err, res){
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(2);
                done();
            });
    });
});
