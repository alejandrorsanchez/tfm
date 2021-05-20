const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const urlUsers = 'http://localhost:3000/users';
const url = 'http://localhost:3000/email';

describe('Testing Add API', function(){
    let userId;
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
    it('should not send email without token', function(done){
        chai.request(url)
            .post('/')
            .end(function (err, res){
                expect(res.header['authorization']).to.be.undefined;
                expect(res).to.have.status(403);
                done();
            });
    });
    it('should send email and return 200', function(done){
        chai.request(url)
            .post('/')
            .send({senderName: 'Sender', receiverName: 'Receiver', receiverEmail: 'receiver@gmail.com'})
            .set('Authorization', 'Bearer '  + token)
            .end(function (err, res){
                expect(res).to.have.status(200);
                done();
            });
    });
});
