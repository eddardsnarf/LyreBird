import app from '../../app';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const postSound = async (attachPath: string, attachFileName: string, loginToken: string): Promise<string> => {
    const res = await chai.request(app)
        .post('/admin/sounds')
        .set('authorization', 'Bearer ' + loginToken)
        .attach('soundFiles', attachPath,
            { filename: attachFileName, contentType: 'audio/mpeg' });
    return res.body[0]._id;
};
export default postSound;
