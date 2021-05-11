var chai = require('chai');
var expect = require('chai').expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const urlUsers = 'http://localhost:3000/users';
const url =      'http://localhost:3000/pets';

describe('Testing Pet API', function(){
    let userId;
    let id;
    let token;
    before('Get session token and user id', function(done){
        chai.request(urlUsers)
            .post('/login')
            .send({username: 'Prueba', password: 'prueba'})
            .end(function (err, res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token').not.be.null;
                token = res.body.token;
                userId = res.body.id;
                done();
            });
    });
    it('should not create a new pet without token', function(done){
        chai.request(url)
            .post('/')
            .send({})
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should create a new pet', function(done){
        chai.request(url)
            .post('/')
            .set('Authorization', 'Bearer '  + token)
            .send({name: 'Coco', breed: 'Boxer', weight: 15, age: 5, description: 'description', picture: '', user_Id: userId})
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('id');
                id = res.body.id;
                done();
            });
    });
    it('should not find pet without token', function(done){
        chai.request(url)
            .get('/search/' + userId)
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should not find pet by non-existing id', function(done){
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
    it('should find pet by its id', function(done){
        chai.request(url)
            .get('/00000')
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(404);
                done();
            });
    });
    it('should not find pet by non-existing user id', function(done){
        chai.request(url)
            .get('/search/00000')
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf(0);
                done();
            });
    });
    it('should find pet by its user id', function(done){
        chai.request(url)
            .get('/search/' + userId)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('id').to.be.equal(id);
                done();
            });
    });
    it('should not update pet without token', function(done){
        chai.request(url)
            .put('/' + id)
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should not update pet by non-existing ID', function(done){
        chai.request(url)
            .put('/00000')
            .set('Authorization', 'Bearer '  + token)
            .send({name: 'another name', breed: 'another breed'})
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('affectedRows').to.be.equal(0);
                done();
            });
    });
    it('should update pet by its ID', function(done){
        chai.request(url)
            .put('/' + id)
            .set('Authorization', 'Bearer '  + token)
            .send({name: 'updated name', breed: 'new breed'})
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('affectedRows').to.be.equal(1);
                done();
            });
    });
    it('should not delete pet without token', function(done){
        chai.request(url)
            .delete('/' + id)
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should delete pet by its ID', function(done){
        chai.request(url)
            .delete('/' + id)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should not find deleted pet', function(done){
        chai.request(url)
            .get('/search/' + userId)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf(0);
                done();
            });
    });
});
