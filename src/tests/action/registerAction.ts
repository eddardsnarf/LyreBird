import app from '../../app';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const register = async (email: string, name: string, password: string, role: string): Promise<void> => {
    const req = {
        email: email,
        name: name,
        password: password,
        role: role
    };
    await chai.request(app)
        .post('/users')
        .send(req);

    return;
};
export default register;
