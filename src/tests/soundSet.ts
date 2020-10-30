import app from '../app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import loginAction from './action/loginAction';
import registerAction from './action/registerAction';
import SoundModel from '../data/model/sound';
import UserModel from '../data/model/user';
import postSound from './action/postSoundAction';

const expect = chai.expect;
let loginToken = '';
let setId = '';
let soundId = '';
chai.use(chaiHttp);
describe('SoundSet Endpoints:', () => {
    before(async () => {
        await UserModel.remove({});
        await SoundModel.remove({});
        const email = 'draude@pmail.com';
        const password = 'draud3';
        const name = 'draude';
        const role = 'admin';
        await registerAction(email, name, password, role);
        loginToken = await loginAction(email, password);
        soundId = await postSound('./test-audio-files/123.mp4',
            '123.mp4', loginToken);
    });

    describe('post soundset', () => {
        it('it should return status 200 and return a non-empty ISoundSchema object', (done) => {
            const name = 'SoundSet1';
            const iconUrl = 'www.imgur.com';
            const soundIds = [soundId];
            const req = {
                name: name,
                iconUrl: iconUrl,
                soundIds: soundIds
            };
            chai.request(app)
                .post('/admin/sets')
                .set('authorization', 'Bearer ' + loginToken)
                .send(req)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body.iconUrl).to.be.eql(iconUrl);
                    expect(res.body.name).to.be.eql(name);
                    setId = res.body._id;
                    done();
                });
        });
    });

    describe('get soundset', () => {
        it('it should return status 200 and return an object', (done) => {
            chai.request(app)
                .get(`/sets/${setId}`)
                .set('authorization', 'Bearer ' + loginToken)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    done();
                });
        });
    });

});
