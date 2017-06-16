import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../bin/www';
import models from '../../models';
import testData from './../testData';

const { admin, newAdmin, regularUser } = testData;
let regularToken, userData, adminToken;

const expect = chai.expect;
chai.use(chaiHttp);
describe('User API', () => {
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

  describe('/POST user', () => {
    it('should create new user', (done) => {
      chai.request(server)
        .post('/api/users')
        .send(newAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.keys(
            ['data', 'message', 'token']
          );
          expect(res.body.message).to.eql('User created successfully');
          userData = res.body;
          done();
        });
    });

    it('should not create user with the same email', (done) => {
      chai.request(server)
        .post('/api/users')
        .send(newAdmin)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.eql('User Already Exists');
          done();
        });
    });

    it('should not create new user with empty params', (done) => {
      chai.request(server)
        .post('/api/users')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.eql('firstName cannot be null');
          done();
      });
    });
  });

  describe('/GET User', () => {
    it('should 401 for users without token', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.a('object');
          done();
        });
    });

    it('should return user with specified id', (done) => {
      chai.request(server)
        .get(`/api/users/${userData.data.id}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.firstName).to.eql(userData.data.firstName);
          done();
        });
    });

    it('should not return user with invalid id', (done) => {
      chai.request(server)
        .get('/api/users/ken')
        .set('x-access-token', userData.token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should return User Not Found for invalid user Id', (done) => {
      chai.request(server)
        .get('/api/users/99910')
        .set('x-access-token', userData.token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('User Not Found');
          done();
        });
    });
  });

  // PUT /users/:id
  describe('/PUT update user', () => {
    it('should allow user update their data', (done) => {
      chai.request(server)
        .put('/api/users/3')
        .set('x-access-token', regularToken)
        .send({ firstName: 'David' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('User updated successfully');
          done();
        });
    });

    it('should allow admin update user data', (done) => {
      chai.request(server)
        .put('/api/users/2')
        .set('x-access-token', adminToken)
        .send({ password: 'mercy123' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('User updated successfully');
          done();
        });
    });

    it('should not update user data with invalid user id ', (done) => {
      chai.request(server)
        .put('/api/users/price')
        .set('x-access-token', adminToken)
        .send({ roleId: 100 })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.eql(
            'invalid input syntax for integer: "price"');
          done();
        });
    });

    it('should not update user data with non existing id', (done) => {
      chai.request(server)
        .put('/api/users/1000')
        .set('x-access-token', adminToken)
        .send({ firstName: 'Tola' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('User Not Found');
          done();
        });
    });

    it('should not update user data with invalid data', (done) => {
      chai.request(server)
        .put('/api/users/2')
        .set('x-access-token', adminToken)
        .send({ email: 10 })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.eql('Use a valid email');
          done();
        });
    });

    it('should return 403 updating another user without admin right ',
    (done) => {
      chai.request(server)
        .put('/api/users/7')
        .set('x-access-token', regularToken)
        .send({ firstName: 'Fine' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.eql('Unauthorized Access');
          done();
        });
    });
  });

  describe('/DELETE user data', () => {
    it('should allow admin delete user data ', (done) => {
      chai.request(server)
        .delete(`/api/users/${userData.data.id}`)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql(
            `${userData.data.firstName} deleted successfully`);
          done();
        });
    });

    it('should return user not found with non existing id', (done) => {
      chai.request(server)
        .delete('/api/users/100')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('User Not Found');
          done();
        });
    });

    it('should return 403 deleting user without admin right',
    (done) => {
      chai.request(server)
        .delete('/api/users/13')
        .set('x-access-token', regularToken)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.eql(
            'Admin access is required for this action');
          done();
        });
    });

    it('should not delete user data with invalid user id ', (done) => {
      chai.request(server)
        .delete('/api/users/bliss')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.eql('invalid input syntax for integer: "bliss"');
          done();
        });
    });
  });
});
