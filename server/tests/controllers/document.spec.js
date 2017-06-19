import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../www.js';
import models from '../../models';
import testData from './../testData';

const { admin, writer, reviewer, publicDocument} = testData;
let adminData, writerData, reviewerData, documentDetails, updatedDocument;

const expect = chai.expect;
chai.use(chaiHttp);
describe('Document API', () => {
  beforeEach(() => {
    setTimeout(() => {}, 3000);
  });
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
      .send(reviewer)
      .end((err, res) => {
        reviewerData = res.body;
        done();
    });
  });
  before((done) => {
    chai.request(server)
      .post('/api/users/login')
      .send(writer)
      .end((err, res) => {
        writerData = res.body;
        done();
    });
  });

  describe('Create Document', () => {
    it('should create new document', (done) => {
      chai.request(server)
        .post('/api/documents')
        .set('x-access-token', writerData.token)
        .send(publicDocument)
        .end((err, res) => {
          documentDetails = res.body;
          expect(res.status).to.equal(201);
          expect(res.body.message).to.eql(
            'Document created successfully');
          done();
        });
    });

    it('should 400 for invalid document data', (done) => {
      chai.request(server)
        .post('/api/documents')
        .set('x-access-token', writerData.token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.eql(
            'title cannot be null');
          done();
        });
    });

    it('should 401 for unauthorized user without token', (done) => {
      chai.request(server)
        .post('/api/documents')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.eql('Please sign in to access this page');
          done();
        });
    });
  });

  describe('/GET Documents', () => {
    it('should 401 for unauthorized user without token', (done) => {
      chai.request(server)
        .get('/api/documents/?limit=10&offset=1')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it('should 200 for authorized user with token', (done) => {
      chai.request(server)
        .get('/api/documents/?limit=10&offset=1')
        .set('x-access-token', adminData.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should 200 without limit and offset', (done) => {
      chai.request(server)
        .get('/api/documents/')
        .set('x-access-token', adminData.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should return document with specified id', (done) => {
      chai.request(server)
        .get(`/api/documents/${documentDetails.document.id}`)
        .set('x-access-token', writerData.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.title).to.eql(documentDetails.document.title);
          done();
        });
    });

    it('should return Document Not Found for non existing document Id', (done) => {
      chai.request(server)
        .get('/api/documents/99910')
        .set('x-access-token', writerData.token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('Document Not Found');
          done();
        });
    });

    it('should return documents for a specified user', (done) => {
      chai.request(server)
        .get(`/api/users/${writerData.data.id}/documents`)
        .set('x-access-token', writerData.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should return users documents with public and same role ', (done) => {
      chai.request(server)
        .get(`/api/users/${reviewerData.data.id}/alldocuments`)
        .set('x-access-token', reviewerData.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should return user not found', (done) => {
      chai.request(server)
        .get('/api/users/1090/documents')
        .set('x-access-token', adminData.token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('No Document Found');
          done();
        });
    });

    it('should return invalid input syntax for integer: "beni" for wrong id',
    (done) => {
      chai.request(server)
        .get('/api/users/beni/documents')
        .set('x-access-token', adminData.token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.eql(
            'invalid input syntax for integer: "beni"');
        done();
      });
    });

    it('should return 400 code status for invalid document Id', (done) => {
      chai.request(server)
        .get('/api/documents/beni')
        .set('x-access-token', writerData.token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.eql(
            'invalid input syntax for integer: "beni"');
        done();
      });
    });
  });

  describe('/PUT update document', () => {
    it('should update document data ', (done) => {
      chai.request(server)
        .put(`/api/documents/${documentDetails.document.id}`)
        .set('x-access-token', writerData.token)
        .send({ title: 'Newly Updated Document' })
        .end((err, res) => {
          updatedDocument = res.body;
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql('Document updated successfully');
          done();
        });
    });

    it('should return Document Not Found for non existent Id', (done) => {
      chai.request(server)
        .put('/api/documents/100')
        .set('x-access-token', adminData.token)
        .send({ title: 'Fresh Update' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('Document Not Found');
          done();
        });
    });

    it('should return Unauthorized Access ', (done) => {
      chai.request(server)
        .put('/api/documents/3')
        .set('x-access-token', adminData.token)
        .send({ title: 'Newly Updated Document' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.eql('Unauthorized Access');
          done();
        });
    });
  });

  describe('/DELETE document data', () => {
    it('should not allow delete of other user document ', (done) => {
      chai.request(server)
        .delete (`/api/documents/${documentDetails.document.id}`)
        .set('x-access-token', adminData.token)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.eql('Unauthorized Access');
          done();
        });
    });

    it('should delete document data ', (done) => {
      chai.request(server)
        .delete (`/api/documents/${documentDetails.document.id}`)
        .set('x-access-token', writerData.token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.eql(
            `${updatedDocument.updatedDoc.title}, was successfully deleted`);
          done();
        });
    });

    it('should return document not found ', (done) => {
      chai.request(server)
        .delete('/api/documents/100')
        .set('x-access-token', writerData.token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('Document Not Found');
          done();
        });
    });

    it('should return document not found ', (done) => {
      chai.request(server)
        .delete('/api/documents/beni')
        .set('x-access-token', writerData.token)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.eql('invalid input syntax for integer: "beni"');
          done();
        });
    });
  });

  describe('Document Search', () => {
    it('Should return a list of documents based on search criteria', (done) => {
      chai.request(server)
        .get('/api/search/documents/?q=this')
        .set('x-access-token', adminData.token)
        .end((err, res) => {
          if (res.body.message) {
            expect(res.body.message).to.eql('Search Successful');
          }
          done();
        });
    });

    it('Should return documents not found', (done) => {
      chai.request(server)
        .get('/api/search/documents/?q=zupite')
        .set('x-access-token', reviewerData.token )
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.eql('No document found');
          done();
        });
    });

    it('Should return error for users without token', (done) => {
      chai.request(server)
        .get('/api/search/documents/?q=in')
        .end((err, res) => {
          expect(res.body.message)
          .to.eql('Please sign in to access this page');
          done();
        });
    });
  });
});
