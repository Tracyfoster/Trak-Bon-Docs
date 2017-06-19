import chai from 'chai';
import model from '../../models';
import testData from '../testData';

const Users = model.Users;
const { userOne } = testData;
let userId;
const expect = chai.expect;

describe('User Model', () => {
  describe('Create User', () => {
    it('should create a user', (done) => {
      Users.create(userOne)
        .then((user) => {
          expect(user.dataValues.title).to.equal(userOne.title);
          userId = user.dataValues.id;
          done();
        });
    });

    it('should fail if email already exist', (done) => {
      Users.create(userOne)
        .then()
        .catch((error) => {
          expect(error.errors[0].message).to.equal('Email already exist');
          expect(error.errors[0].type).to.equal('unique violation');
          done();
        });
    });

    it('should fail if email is invalid', (done) => {
      userOne.email = 'random@gamil';
      Users.create(userOne)
      .then()
      .catch((error) => {
        expect(error.errors[0].message).to.equal('Use a valid email');
        done();
      });
    });


    it('should fail if password is null', (done) => {
      userOne.email = 'random@gamil.com';
      userOne.password = null;
      Users.create(userOne)
      .then()
      .catch((error) => {
        expect(error.errors[0].message).to.equal('password cannot be null');
        done();
      });
    });
  });

  describe('Update User', () => {
    it('should update a user', (done) => {
      Users.findById(userId)
        .then((user) => {
          user.update({ firstName: 'Socrates' })
            .then((updatedUser) => {
              expect(updatedUser.dataValues.id).to.equal(userId);
              expect(user.dataValues.firstName).to.equal('Socrates');
              done();
            });
        });
    });
  });

  describe('Delete User', () => {
    it('should delete a user', (done) => {
      Users.destroy({ where: { id: userId } })
        .then(() => {
          Users.findById(userId)
            .then((res) => {
              expect(res).to.equal(null);
              done();
            });
        });
    });
  });
});
