import chai from 'chai';
import httpMocks from 'node-mocks-http';
import events from 'events';
import chaiHttp from 'chai-http';
import server from '../../www.js';
import testData from '../testData';
import authentication from '../../helper/authentication';

const { regularUser, admin, invalidToken } = testData;
let regularToken, adminToken;

const expect = chai.expect;
const responseEvent = () => httpMocks
.createResponse({ eventEmitter: events.EventEmitter });
chai.use(chaiHttp);

describe('Authentication', () => {
  beforeEach(() => {
    setTimeout(() => {}, 3000);
  });
  before((done) => {
    chai.request(server)
      .post('/api/users/login')
      .send(admin)
      .end((err, res) => {
        adminToken = res.body.token;
        done();
    });
  });
  before((done) => {
    chai.request(server)
      .post('/api/users/login')
      .send(regularUser)
      .end((err, res) => {
        regularToken = res.body.token;
        done();
      });
  });

  describe('Default route /api', () => {
    it('should welcome you to TrakBon Docs', (done) => {
      chai.request(server)
        .post('/api/')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  })
  describe('Verify Token', () => {
    it('should grant access if token is valid', (done) => {
      const response = responseEvent();
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/documents',
        headers: { 'x-access-token': regularToken }
      });

      const callback = () => {
        expect(request.decoded.id).to.equal(3);
        expect(request.decoded.firstName).to.equal('David');
        done();
      };
      authentication.verifyToken(request, response, callback);

      expect(response._getData().message).to.equal(undefined);
    });


    it('should deny access if no token was provided', (done) => {
      const response = responseEvent();
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/documents'
      });

      const callback = () => {};
      authentication.verifyToken(request, response, callback);
      
      expect(response._getData().message).to.equal('Please sign in to access this page');
      done();
    });


    it('should deny access if token is invalid', (done) => {
      const response = responseEvent();
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/api/documents',
        headers: { 'x-access-token': invalidToken }
      });

      const callback = () => {};
      authentication.verifyToken(request, response, callback);

      response.on('end', () => {
        expect(response._getData().message).to.equal('Authentication failed');
        done();
      });
    });
  });

  describe('Verify Admin', () => {
    it('should grant access to an admin', (done) => {
      const response = responseEvent();
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        decoded: { roleId: 1 }
      });

      const callback = () => {
        expect(request.decoded.roleId).to.equal(1);
        done();
      };
      authentication.adminAccess(request, response, callback);
      response.on('end', () => {
        expect(response._getData().message).to.equal(undefined);
        done();
      });
    });


    it('should deny access if the user is not an admin', (done) => {
      const response = responseEvent();
      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        decoded: { roleId: 2 }
      });

      const callback = () => {};
      authentication.adminAccess(request, response, callback);
      response.on('end', () => {
        expect(response._getData().message).to.equal('Admin access is required for this action');
        done();
      });
    });
  });
});