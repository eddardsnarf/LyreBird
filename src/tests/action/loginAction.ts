import app from '../../app';
import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);

const login = async (email: string, password: string): Promise<string> => {
    const req = {
        email: email,
        password: password
    };
    const res = await chai.request(app)
        .post('/users/sessions')
        .send(req);

    return res.body.token;
};
export default login;
