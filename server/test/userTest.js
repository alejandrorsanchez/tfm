const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const url = 'http://localhost:3000/users';

describe('Testing User API', function(){
    let id;
    let token;
    it('should save a new user', function(done){
        chai.request(url)
            .post('/')
            .send({username: 'Celia', password: 'celia', address: 'new direction', description: 'new description', email: 'email@gmail.com'})
            .end(function (err, res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('id');
                id = res.body.id;
                done();
            });
    });
    it('should find user by its name and therefore return 409 by app logic', function(done){
        chai.request(url)
            .get('/search/Celia')
            .end(function (err, res){
                expect(res).to.have.status(409);
                expect(res.body).to.have.property('message').to.be.equal('Ese usuario ya existe');
                done();
            });
    });
    it('should not find user by non-existing user name and therefore return 200 by app logic', function(done){
        chai.request(url)
            .get('/search/Ce')
            .end(function (err, res){
                expect(res).to.have.status(200);
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
            .get('/' + id)
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should find user by its ID', function(done){
        chai.request(url)
            .get('/' + id)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('id').to.be.equal(id);
                done();
            });
    });
    it('should not update user without token', function(done){
        chai.request(url)
            .put('/' + id)
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should not update user by non-existing ID', function(done){
        chai.request(url)
            .put('/00000')
            .set('Authorization', 'Bearer '  + token)
            .send({address: 'another address', description: 'another description'})
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(404);
                done();
            });
    });
    it('should update user by its ID', function(done){
        chai.request(url)
            .put('/' + id)
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
            .delete('/' + id)
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should delete user by its ID', function(done){
        chai.request(url)
            .delete('/' + id)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should not find deleted user', function(done){
        chai.request(url)
            .get('/' + id)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(404);
                done();
            });
    });
});
