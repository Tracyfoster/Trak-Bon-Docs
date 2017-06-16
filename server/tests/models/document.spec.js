import chai from 'chai';
import model from '../../models';
import testData from '../testData';

const Documents = model.Documents;
const { roleDocument } = testData;
let documentId;
const expect = chai.expect;

describe('Document Model', () => {
  describe('Create Document', () => {
    it('should create a document', (done) => {

      Documents.create(roleDocument)
        .then((document) => {
          expect(document.dataValues.title).to.equal(roleDocument.title);
          expect(document.dataValues.content).to.equal(roleDocument.content);
          documentId = document.dataValues.id;
          done();
        });
    });

    it('should fail if title already exist', (done) => {
      Documents.create(roleDocument)
        .then((document) => {
          console.log(document.dataValues);
          done();
        })
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Title already exist');
          expect(error.errors[0].type).to.equal('unique violation');
          done();
        });
    });

    it('should fail if title was not provided', (done) => {
      roleDocument.title = '';
      Documents.create(roleDocument)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Title cannot be empty');
          done();
        });
    });

    it('should fail if content was not provided', (done) => {
      roleDocument.title = 'sample title';
      roleDocument.content = '';
      Documents.create(roleDocument)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Content cannot be empty');
          done();
        });
    });

    it('should fail if access is not public, private or reviewers or writers', (done) => {
      roleDocument.content = 'sample content';
      roleDocument.access = 'wrongRole';
      Documents.create(roleDocument)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Use a valid access type');
          done();
        });
    });
  });

  describe('Update Document', () => {
    it('should update a document', (done) => {
      Documents.findById(documentId)
        .then((document) => {
          document.update({ title: 'Chessmen from mars' })
            .then((updatedDocument) => {
              expect(updatedDocument.dataValues.id).to.equal(documentId);
              expect(document.dataValues.title).to.equal('Chessmen from mars');
              done();
            });
        });
    });
  });

  describe('Delete Document', () => {
    it('should delete a document', (done) => {
      Documents.destroy({ where: { id: documentId } })
        .then(() => {
          Documents.findById(documentId)
            .then((res) => {
              expect(res).to.equal(null);
              done();
            });
        });
    });
  });
});
