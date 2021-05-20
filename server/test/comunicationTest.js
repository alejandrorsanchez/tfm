const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const urlUsers = 'http://localhost:3000/users';
const url = 'http://localhost:3000/comunications';

describe('Testing Add API', function(){
    let token;
    let myUserId;
    let chatUserId;
    let chatId;
    before('Get session token and user id', function(done){
        chai.request(urlUsers)
            .post('/login')
            .send({username: 'Prueba', password: 'prueba'})
            .end(function (err, res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token').not.be.null;
                token = res.body.token;
                myUserId = res.body.id;
                done();
            });
    });
    it('should save another user for interaction', function(done){
        chai.request(urlUsers)
            .post('/')
            .send({username: 'Prueba2', password: 'Prueba2', address: 'Prueba2 direction', description: 'Prueba2 description', email: 'Prueba2@gmail.com'})
            .end(function (err, res){
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('id');
                chatUserId = res.body.id;
                done();
            });
    });
    it('should not find any comunications without token', function(done){
        chai.request(url)
            .get('/' + myUserId)
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should not find any comunication by my user id', function(done){
        chai.request(url)
            .get('/' + myUserId)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf(0);
                done();
            });
    });
    it('should not create a new chat without token', function(done){
        chai.request(url)
            .post('/')
            .send({})
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should create a new chat between two users', function(done){
        chai.request(url)
            .post('/')
            .set('Authorization', 'Bearer '  + token)
            .send({userId1: myUserId, userId2: chatUserId, messages: 'hola', type: 1, notification: chatUserId})
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('id');
                chatId = res.body.id;
                done();
            });
    });
    it('should not create the same chat', function(done){
        chai.request(url)
            .post('/')
            .set('Authorization', 'Bearer '  + token)
            .send({userId1: myUserId, userId2: chatUserId, messages: 'hola', type: 1, notification: chatUserId})
            .end(function (err, res){
                expect(res).to.have.status(409);
                done();
            });
    });
    it('should not find chat by non-existing user id', function(done){
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
    it('should find chat by my user id', function(done){
        chai.request(url)
            .get('/' + myUserId)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('id').to.be.equal(chatId);
                done();
            });
    });
    it('should find chat by chat user id', function(done){
        chai.request(url)
            .get('/' + chatUserId)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf(1);
                expect(res.body[0]).to.have.property('id').to.be.equal(chatId);
                done();
            });
    });
    it('should not find created chat between users without token', function(done){
        chai.request(url)
            .get('/')
            .query({userId1: myUserId, userId2: chatUserId, type: 1})
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should not find chat between users by non-existing users id', function(done){
        chai.request(url)
            .get('/')
            .query({userId1: '0000', userId2: 'xxxxx', type: 1})
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(404);
                done();
            });
    });
    it('should find chat between users by its users id and type 1 (Adoption)', function(done){
        chai.request(url)
            .get('/')
            .query({userId1: myUserId, userId2: chatUserId, type: '1'})
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('id').to.be.equal(chatId);
                expect(res.body).to.have.property('notification').to.be.equal(chatUserId);
                done();
            });
    });
    it('should not update chat without token', function(done){
        chai.request(url)
            .put('/' + chatId)
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should not update chat by non-existing ID', function(done){
        chai.request(url)
            .put('/00000')
            .set('Authorization', 'Bearer '  + token)
            .send({messages: 'hola', notification: 'notif'})
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('affectedRows').to.be.equal(0);
                done();
            });
    });
    it('should update chat by its ID', function(done){
        chai.request(url)
            .put('/' + chatId)
            .set('Authorization', 'Bearer '  + token)
            .send({messages: 'hola', notification: myUserId})
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('affectedRows').to.be.equal(1);
                done();
            });
    });
    it('Chat between users should now have notifications for the other user', function(done){
        chai.request(url)
            .get('/')
            .query({userId1: myUserId, userId2: chatUserId, type: '1'})
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('id').to.be.equal(chatId);
                expect(res.body).to.have.property('notification').to.be.equal(myUserId);
                done();
            });
    });
    it('should not delete chat without token', function(done){
        chai.request(url)
            .delete('/' + chatId)
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should delete chat by its ID', function(done){
        chai.request(url)
            .delete('/' + chatId)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should not find deleted chat by any of its users id', function(done){
        chai.request(url)
            .get('/' + chatUserId)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.lengthOf(0);
                done();
            });
    });
    it('should delete chat user for its ID', function(done){
        chai.request(urlUsers)
            .delete('/' + chatUserId)
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res.header['authorization']).not.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
});
