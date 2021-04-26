var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
const url = 'http://localhost:3000/users';

describe('Testing User API', function(){
    let userId;
    let token;
    it('should save a new user', function(done){
        chai.request(url)
            .post('/')
            .send({username: 'Celia', password: 'celia', address: 'new direction', description: 'new description'})
            .end(function (err, res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message');
                done();
            });
    });
    it('should find user for its name', function(done){
        chai.request(url)
            .get('/search/Celia')
            .end(function (err, res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('username').to.be.equal('Celia');
                userId = res.body[0].id;
                done();
            });
    });
    it('should not find user for non-existing user name', function(done){
        chai.request(url)
            .get('/search/Ce')
            .end(function (err, res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf(0);
                done();
            });
    });
    it('should find user and return login token', function(done){
        chai.request(url)
            .post('/login')
            .send({username: 'Celia', password: 'celia'})
            .end(function (err, res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token').not.be.null;
                token = res.body.token;
                done();
            });
    });
    it('should not find user without token', function(done){
        chai.request(url)
            .get('/' + userId)
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should find user for its ID', function(done){
        chai.request(url)
            .get('/' + userId)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('id').to.be.equal(userId);
                done();
            });
    });
    it('should not update user without token', function(done){
        chai.request(url)
            .put('/' + userId)
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should not update user for non-existing ID', function(done){
        chai.request(url)
            .put('/111')
            .set('Authorization', 'Bearer '  + token)
            .send({address: 'another address', description: 'another description'})
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it('Created user should not have changed', function(done){
        chai.request(url)
            .get('/' + userId)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('id').to.be.equal(userId);
                expect(res.body[0]).to.have.property('address').not.to.be.equal('another address');
                expect(res.body[0]).to.have.property('description').not.to.be.equal('another description');
                done();
            });
    });
    it('should update user for its ID', function(done){
        chai.request(url)
            .put('/' + userId)
            .set('Authorization', 'Bearer '  + token)
            .send({address: 'updated address', description: 'updated description'})
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should not delete user without token', function(done){
        chai.request(url)
            .delete('/' + userId)
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should delete user for its ID', function(done){
        chai.request(url)
            .delete('/' + userId)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should not find deleted user', function(done){
        chai.request(url)
            .get('/' + userId)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf(0);
                done();
            });
    });
});
