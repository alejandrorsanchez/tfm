const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const urlPets = 'http://localhost:3000/pets';
const urlUsers = 'http://localhost:3000/users';
const url = 'http://localhost:3000/adds';

describe('Testing Add API', function(){
    let userId;
    let petId;
    let volunteerId;
    let adoptionId;
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
    it('should create a new pet for test user', function(done){
        chai.request(urlPets)
            .post('/')
            .set('Authorization', 'Bearer '  + token)
            .send({name: 'pet test', breed: 'breed test', weight: 1, age: 1, description: 'descriptionTest', picture: '', user_Id: userId})
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('id');
                petId = res.body.id;
                done();
            });
    });
    it('should not find any add by user id', function(done){
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
    it('should not create a new volunteer add without token', function(done){
        chai.request(url)
            .post('/volunteer')
            .send({})
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should create a new volunteer add', function(done){
        chai.request(url)
            .post('/volunteer')
            .set('Authorization', 'Bearer '  + token)
            .send({userId: userId, petId: null})
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('id');
                volunteerId = res.body.id;
                done();
            });
    });
    it('should not create the same volunteer add', function(done){
        chai.request(url)
            .post('/volunteer')
            .set('Authorization', 'Bearer '  + token)
            .send({userId: userId, petId: null})
            .end(function (err, res){
                expect(res).to.have.status(409);
                done();
            });
    });
    it('should not find created add without token', function(done){
        chai.request(url)
            .get('/' + userId)
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should not find add by non-existing user id', function(done){
        chai.request(url)
            .get('/0000')
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf(0);
                done();
            });
    });
    it('should find volunteer add by its user id', function(done){
        chai.request(url)
            .get('/' + userId)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('id').to.be.equal(volunteerId);
                done();
            });
    });
    it('should not create a new adoption add without token', function(done){
        chai.request(url)
            .post('/adoption')
            .send({})
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should create a new adoption add', function(done){
        chai.request(url)
            .post('/adoption')
            .set('Authorization', 'Bearer '  + token)
            .send({userId: userId, petId: petId})
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('id');
                adoptionId = res.body.id;
                done();
            });
    });
    it('should not create the same adoption add', function(done){
        chai.request(url)
            .post('/adoption')
            .set('Authorization', 'Bearer '  + token)
            .send({userId: userId, petId: petId})
            .end(function (err, res){
                expect(res).to.have.status(409);
                done();
            });
    });
    it('should find adoption add by its user id', function(done){
        chai.request(url)
            .get('/' + userId)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf(2);
                expect(res.body[1]).to.have.property('id').to.be.equal(adoptionId);
                done();
            });
    });
    it('should not delete add without token', function(done){
        chai.request(url)
            .delete('/' + volunteerId)
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should delete volunteer add by its ID', function(done){
        chai.request(url)
            .delete('/' + volunteerId)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should not find deleted volunteer add', function(done){
        chai.request(url)
            .get('/' + userId)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('id').not.be.equal(volunteerId);
                done();
            });
    });
    it('should delete adoption add by its ID', function(done){
        chai.request(url)
            .delete('/' + adoptionId)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should not find deleted adoption add', function(done){
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
    it('should not find any add by type 1 (Adoption) for my user id when another user searches for it', function(done){
        chai.request(url)
            .get('/')
            .set('Authorization', 'Bearer '  + token)
            .send({type: 1, userId: 1})
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(404);
                done();
            });
    });
    it('should not find any add by type 2 (Volunteer) for my user id when another user searches for it', function(done){
        chai.request(url)
            .get('/')
            .set('Authorization', 'Bearer '  + token)
            .send({type: 2, userId: 1})
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(404);
                done();
            });
    });
    it('should delete pet for its ID', function(done){
        chai.request(urlPets)
            .delete('/' + petId)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
});
