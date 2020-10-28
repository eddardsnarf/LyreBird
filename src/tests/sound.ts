import app from '../app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import loginAction from './action/loginAction';
import registerAction from './action/registerAction';
import SoundModel from '../data/model/sound';
import UserModel from '../data/model/user';
import path from 'path';

const expect = chai.expect;
let loginToken = '';

chai.use(chaiHttp);
describe('Sound Endpoints:', () => {
    before((done) => {
        UserModel.remove({}, (err) => {
            SoundModel.remove({}, async (err) => {
                const email = 'draude@pmail.com';
                const password = 'draud3';
                const name = 'draude';

                await registerAction(email, name, password);
                loginToken = await loginAction(email, password);
                console.log(`LOGIN_TOKEN:${loginToken}`);
                done();
            });
        });
    });

    describe('post sounds', () => {
        it('it should return status 403 since you dont have a admin role', (done) => {
            console.log(path.resolve('./'));
            chai.request(app)
                .post('/admin/sounds')
                .set('authorization', 'Bearer ' + loginToken)
                .attach('soundFiles', './test-audio-files/123.mp4', '123.mp4')
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                });
        });
    });
});
