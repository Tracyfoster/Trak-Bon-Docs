// import chai from 'chai';
// import httpMocks from 'node-mocks-http';
// import events from 'events';
// import chaiHttp from 'chai-http';
// import server from '../../app';
// import testData from '../testData';
// import authentication from '../../helpers/authentication';

// const { regularUser, admin, invalidToken } = testData;
// let regularToken, adminToken ;

// const expect = chai.expect;
// const responseEvent = () => httpMocks
// .createResponse({ eventEmitter: events.EventEmitter });
// chai.use(chaiHttp);

// describe('Authentication', () => {
//   before((done) => {
//     chai.request(server)
//       .post('/users/login')
//       .send(regularUser)
//       .end((err, res) => {
//         regularToken = res.body.token;
//         done();
//       });
//   });
//   before((done) => {
//     chai.request(server)
//       .post('/users/login')
//       .send(admin)
//       .end((err, res) => {
//         adminToken = res.body.token;
//         done();
//       });
//   });


//   describe('VerifyToken', () => {
//     it('should grant access if token is valid', (done) => {
//       const response = responseEvent();
//       response = {};
//       const request = httpMocks.createRequest({
//         method: 'GET',
//         url: '/documents',
//         headers: { 'x-access-token': regularToken }
//       });

//       const callback = () => {
//         expect(response.decoded.id).to.equal(3);
//         expect(response.decoded.email).to.equal('john@john.com');
//         done();
//       };
//       authentication.verifyToken(request, response, callback);

//       expect(response._getData().message).to.equal(undefined);
//     });


//     it('should deny access if no token was provided', (done) => {
//       const response = responseEvent();
//       response = {};
//       const request = httpMocks.createRequest({
//         method: 'GET',
//         url: '/users'
//       });

//       const callback = () => {};
//       authentication.verifyToken(request, response, callback);

//       expect(response._getData().message).to
//         .equal('Please sign in to access this page');
//       done();
//     });


//     it('should deny access if token is invalid', (done) => {
//       const response = responseEvent();
//       const request = httpMocks.createRequest({
//         method: 'GET',
//         url: '/documents',
//         headers: { 'x-access-token': invalidToken }
//       });

//       const callback = () => {};
//       authentication.verifyToken(request, response, callback);

//       response.on('end', () => {
//         expect(response._getData().message).to.equal('Authentication failed');
//         done();
//       });
//     });
//   });

//   describe('AdminAccess', () => {
//     it('should grant access if token is from admin', (done) => {
//       const response = responseEvent();
//       response = {};
//       const request = httpMocks.createRequest({
//         method: 'GET',
//         url: '/users',
//         headers: { 'x-access-token': adminToken }
//       });

//       const callback = () => {
//         expect(response.decoded.id).to.equal();
//         expect(response.decoded.email).to.equal('admin@admin.com');
//         done();
//       };
//       authentication.adminAccess(request, response, callback);

//       expect(response._getData().message).to.equal(undefined);
//     });


//     it('should deny access if user is not admin', (done) => {
//       const response = responseEvent();
//       response = {};
//       const request = httpMocks.createRequest({
//         method: 'GET',
//         url: '/users',
//         headers: { 'x-access-token': regularToken }
//       });

//       const callback = () => {};
//       authentication.adminAccess(request, response, callback);

//       expect(response._getData().message).to
//         .equal('Admin access is required for this action');
//       done();
//     });
//   });
// });