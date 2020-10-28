import app from '../app';
import UserModel from '../data/model/user';

import chai from 'chai';
import chaiHttp from 'chai-http';

const expect = chai.expect;


chai.use(chaiHttp);
describe('User Management Endpoints:', () => {
    before((done) => {
        UserModel.remove({}, (err) => {
            done();
        });
    });
    describe('register', () => {
        it('it should return the new email and name', (done) => {
            const email = 'draude@pmail.com';
            const name = 'draude';
            const req = {
                name: name,
                email: email,
                password: 'draud3',
                role:'user'
            };
            chai.request(app)
                .post('/users')
                .send(req)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('email').eql(email);
                    expect(res.body).to.have.property('name').eql(name);

                    done();
                });
        });
    });
    describe('login', () => {
        it('it should return the new token', (done) => {
            const email = 'draude@pmail.com';
            const password = 'draud3';
            const req = {
                email: email,
                password: password
            };

            chai.request(app)
                .post('/users/sessions')
                .send(req)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('token').not.null;
                    done();
                });
        });
    });
});
