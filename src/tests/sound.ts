import app from '../app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import loginAction from './action/loginAction';
import registerAction from './action/registerAction';
import SoundModel from '../data/model/sound';
import UserModel from '../data/model/user';

const expect = chai.expect;
let loginToken = '';
let savedSoundId = '';
chai.use(chaiHttp);
describe('Sound Endpoints:', () => {
    before((done) => {
        UserModel.remove({}, (err) => {
            SoundModel.remove({}, async (err) => {
                const email = 'draude@pmail.com';
                const password = 'draud3';
                const name = 'draude';
                const role = 'admin';
                await registerAction(email, name, password, role);
                loginToken = await loginAction(email, password);
                done();
            });
        });
    });

    describe('post sounds', () => {
        it('it should return status 200 and return a non-empty array', (done) => {
            chai.request(app)
                .post('/admin/sounds')
                .set('authorization', 'Bearer ' + loginToken)
                .attach('soundFiles', './test-audio-files/123.mp4',
                    { filename: '123.mp4', contentType: 'audio/mpeg' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.be.greaterThan(0);
                    savedSoundId = res.body[0]._id;
                    done();
                });
        });
    });

    describe('get sound', () => {
        it('it should return status 200 and return a Readable', (done) => {
            chai.request(app)
                .get(`/sounds/${savedSoundId}`)
                .set('authorization', 'Bearer ' + loginToken)
                .responseType('blob')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.type).to.be.eql('audio/mpeg');
                    expect(res.body).to.be.instanceOf(Buffer);
                    done();
                });
        });
    });

    describe('get sounds', () => {
        it('it should return status 200 and return array', (done) => {
            chai.request(app)
                .get('/sounds')
                .set('authorization', 'Bearer ' + loginToken)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });
});
