import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const expect = chai.expect;

describe('API tests', () => {
  it('should return a 200 status code', (done) => {
    chai.request('https://example.com')
      .get('/api')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});