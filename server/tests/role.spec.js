import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../bin/www';
import models from '../models';
import testData from './testData';

const { admin, regularUser, roleOne } = testData;
let regularToken, adminToken;

const expect = chai.expect;
chai.use(chaiHttp);
describe('Role', () => {
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

  // POST /roles
  describe('/POST role', () => {
    it('should allow an admin to create a new role', (done) => {
      chai.request(server)
      .post('/api/roles')
      .set({ 'x-access-token': adminToken })
      .send(roleOne)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.keys(
          ['role', 'message']
        );
        expect(res.body.role.roleName).to.eql('newrole');
        expect(res.body.message).to.eql('Role created succesfully');
        roleOne.roleId = res.body.role.id;
        done();
      });
    });

    it('should fail if role already exists', (done) => {
      chai.request(server)
      .post('/api/roles')
      .set({ 'x-access-token': adminToken })
      .send(roleOne)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message)
          .to.eql('Role Already Exists');
        done();
      });
    });

    it('should deny access if user is not admin', (done) => {
      chai.request(server)
      .post('/api/roles')
      .set({ 'x-access-token': regularToken })
      .send({ roleName: 'subscriber' })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('User is unauthorized for this request.');
        done();
      });
    });
  });

  // GET /roles
  describe('/GET roles', () => {
    it('should return all roles for admin', (done) => {
      chai.request(server)
        .get('/api/roles')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.role).to.be.a('array');
          expect(res.body.role.length).to.be.greaterThan(0);
          done();
      });
    });

    it('should not return roles if user is not admin', (done) => {
      chai.request(server)
        .get('/api/roles')
        .set({ 'x-access-token': regularToken })
        .end((err, res) => {
          expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('User is unauthorized for this request.');
          done();
      });
    });
  });

  // GET /roles/:id
  describe('/GET/:id role', () => {
    it('should return a role given an id', (done) => {
      chai.request(server)
        .get('/api/roles/2')
        .set({ 'x-access-token': adminToken })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.role.roleName).to.eql('reviewers');
          done();
      });
    });

    it('should send "Role Not Found" for invalid id', (done) => {
      chai.request(server)
      .get('/api/roles/250')
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Role Not Found');
        done();
      });
    });

    it('should fail if the provided id is out of range',
    (done) => {
      chai.request(server)
      .get('/api/roles/3000000000')
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql(
          'Error occured while retrieving role'
        );
        done();
      });
    });
  });

  // // PUT /roles/:id
  describe('/PUT/:id role', () => {
    it('should allow an admin to edit a role', (done) => {
      chai.request(server)
      .put(`/api/roles/${roleOne.roleId}`)
      .set({ 'x-access-token': adminToken })
      .send({ roleName: 'testing' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.role.roleName).to.eql('testing');
        done();
      });
    });

    it('should deny access if user is not an admin', (done) => {
      chai.request(server)
      .put(`/api/roles/${roleOne.roleId}`)
      .set({ 'x-access-token': regularToken })
      .send({ name: 'observer' })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('User is unauthorized for this request.');
        done();
      });
    });

    it('should send "Role Not Found" for invalid id', (done) => {
      chai.request(server)
      .put('/api/roles/250')
      .set({ 'x-access-token': adminToken })
      .send({ name: 'team7' })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Role Not Found');
        done();
      });
    });

    it('should fail if the provided id is out of range',
    (done) => {
      chai.request(server)
      .put('/api/roles/3000000000')
      .set({ 'x-access-token': adminToken })
      .send({ name: 'team7' })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Error updating role');
        done();
      });
    });
  });

  // // // DELETE /roles/:id
  describe('/DELETE/:id role', () => {
    it('should allow admin to delete a role', (done) => {
      chai.request(server)
      .delete(`/api/roles/${roleOne.roleId}`)
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Role deleted successfully.');
        done();
      });
    });

    it('should deny access if user is not an admin', (done) => {
      chai.request(server)
      .delete('/api/roles/2')
      .set({ 'x-access-token': regularToken })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('User is unauthorized for this request.');
        done();
      });
    });

    it('should send "Role Not Found" for invalid id', (done) => {
      chai.request(server)
      .delete('/api/roles/250')
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Role Not Found');
        done();
      });
    });

    it('should fail if the provided id is out of range',
    (done) => {
      chai.request(server)
      .delete('/api/roles/3000000000')
      .set({ 'x-access-token': adminToken })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.a('object');
        expect(res.body.message).to.eql('Error deleting Role.');
        done();
      });
    });
  });
});
