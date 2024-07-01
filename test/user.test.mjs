import * as chai from 'chai';
import chaiHttp from 'chai-http';
import  serverModule from '../sever.js';
const {server}=serverModule;
const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
    let userId;

    it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/worko/user')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('it should POST a new user', (done) => {
        const user = {
            email: 'test@example.com',
            name: 'John Doe',
            age: 30,
            city: 'New York',
            zipCode: '10001'
        };
        chai.request(server)
            .post('/worko/user')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('email').eql(user.email);
                res.body.should.have.property('name').eql(user.name);
                res.body.should.have.property('age').eql(user.age);
                res.body.should.have.property('city').eql(user.city);
                res.body.should.have.property('zipCode').eql(user.zipCode);
                userId = res.body.id; 
                done();
            });
    });

    it('it should GET a user by the given id', (done) => {
        chai.request(server)
            .get(`/worko/user/${userId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id').eql(userId);
                res.body.should.have.property('email');
                res.body.should.have.property('name');
                res.body.should.have.property('age');
                res.body.should.have.property('city');
                res.body.should.have.property('zipCode');
                done();
            });
    });

    it('it should PUT (update) a user by the given id', (done) => {
        const user = {
            email: 'test2@example.com',
            name: 'Jane Doe',
            age: 28,
            city: 'San Francisco',
            zipCode: '94101'
        };
        chai.request(server)
            .put(`/worko/user/${userId}`)
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id').eql(userId);
                res.body.should.have.property('email').eql(user.email);
                res.body.should.have.property('name').eql(user.name);
                res.body.should.have.property('age').eql(user.age);
                res.body.should.have.property('city').eql(user.city);
                res.body.should.have.property('zipCode').eql(user.zipCode);
                done();
            });
    });

    it('it should PATCH (update) a user by the given id', (done) => {
        const user = {
            age: 29
        };
        chai.request(server)
            .patch(`/worko/user/${userId}`)
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id').eql(userId);
                res.body.should.have.property('age').eql(user.age);
                done();
            });
    });

    it('it should DELETE (soft delete) a user by the given id', (done) => {
        chai.request(server)
            .delete(`/worko/user/${userId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id').eql(userId);
                done();
            });
    });
});
