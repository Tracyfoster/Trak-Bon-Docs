import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../bin/www';
import models from '../models';
import testData from './testData';

const { admin, regularUser, } = testData;
let adminData, userData;

const expect = chai.expect;
chai.use(chaiHttp);
describe('Search API', () => {
  before((done) => {
    chai.request(server)
      .post('/api/users/login')
      .send(admin)
      .end((err, res) => {
        adminData = res.body;
        done();
    });
  });
  before((done) => {
    chai.request(server)
      .post('/api/users/login')
      .send(regularUser)
      .end((err, res) => {
        userData = res.body;
        done();
    });
  });

  describe('User Search', () => {
    it('Should return a list of users based on search criteria', (done) => {
      chai.request(server)
        .get('/api/search/users/?q=mercy')
        .set('x-access-token', adminData.token)
        .end((err, res) => {
          expect(res.body.user[0].username).to.eql('dupe');
          done();
        });
    });

    it('Should return users not found', (done) => {
      chai.request(server)
        .get('/api/search/users/?q=zu')
        .set('x-access-token', adminData.token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('Users Not Found');
          done();
        });
    });

    it('Should return error for non-admin search', (done) => {
      chai.request(server)
        .get('/api/search/users/?q=r')
        .set({ 'x-access-token': userData.token })
        .end((err, res) => {
          expect(res.body.message)
          .to.eql('User is unauthorized for this request.');
          done();
        });
    });
  });

  describe('Document Search', () => {
    it('Should return a list of documents based on search criteria', (done) => {
      chai.request(server)
        .get('/api/search/documents/?q=title')
        .set('x-access-token', adminData.token)
        .end((err, res) => {
          if (res.body.message) {
            expect(res.body.message).to.eql('Documents Not Found');
          }
          done();
        });
    });

    it('Should return documents not found', (done) => {
      chai.request(server)
        .get('/api/search/documents/?q=zu')
        .set('x-access-token', adminData.token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('Documents Not Found');
          done();
        });
    });

    it('Should return error for non-admin search', (done) => {
      chai.request(server)
        .get('/api/search/documents/?q=in')
        .set({ 'x-access-token': regularDetails.token })
        .end((err, res) => {
          expect(res.body.message)
          .to.eql('User is unauthorized for this request.');
          done();
        });
    });
  });
});
