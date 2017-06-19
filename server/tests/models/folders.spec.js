import chai from 'chai';
import model from '../../models/';
import testData from '../testData';

const Folder = model.Folder;
const { folderOne } = testData;
let folderId;
const expect = chai.expect;

describe('Folder Model', () => {
  describe('Create Folder', () => {
    it('should create a folder', (done) => {
      Folder.create(folderOne)
        .then((folder) => {
          expect(folder.dataValues.folderName).to.equal(folderOne.folderName);
          folderId = folder.dataValues.id;
          done();
        });
    });

    it('should fail when folder name already exist', (done) => {
      Folder.create({ folderName: 'archives' })
        .then((folder) => {
          done();
        })
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Folder already exist');
          expect(error.errors[0].type).to.equal('unique violation');
          done();
        });
    });

    it('should fail if name was not provided', (done) => {
      Folder.create({ folderName: '' })
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Name cannot be empty');
          done();
        });
    });

    it('should fail when the name of a folder is null', (done) => {
      Folder.create({ folderName: null })
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('folderName cannot be null');
          expect(error.errors[0].type).to.equal('notNull Violation');
          expect(error.errors[0].value).to.equal(null);
          done();
        });
    });
  });

  describe('Update Folder', () => {
    it('should update a folder', (done) => {
      Folder.findById(folderId)
        .then((folder) => {
          folder.update({ folderName: 'News' })
            .then((updatedFolder) => {
              expect(updatedFolder.dataValues.id).to.equal(folderId);
              expect(folder.dataValues.folderName).to.equal('News');
              done();
            });
        });
    });
  });

  describe('Delete Folder', () => {
    it('should delete a folder', (done) => {
      Folder.destroy({ where: { id: folderId } })
        .then(() => {
          Folder.findById(folderId)
            .then((res) => {
              expect(res).to.equal(null);
              done();
            });
        });
    });
  });
});
